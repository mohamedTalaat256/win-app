import { Box, Card, CardActions, CardContent, CircularProgress, Divider, IconButton, InputBase, Typography, } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { Send } from "@mui/icons-material";
import appUrl from "../../../appUrl";
import ReactFileReader from "react-file-reader";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";
import Pusher from 'pusher-js';
import axiosClient from "../../../axios-client";
import { toast } from 'react-toastify';
import ChatMessageItem from "./MessageItem";
import UserHeader from "./UserHeader";
import DefaultHeader from "./DefaultHeader";


export default function Messages({ chatMessages, secondUser }) {

    const [messages, setMessages] = useState(chatMessages);
    const [message, setMessage] = useState('');

    const messagesEndRef = useRef(null);
    const [images, setImages] = useState([]);
    const { user, token } = useStateContext(ContextProvider);
    const [sending, setSending] = useState(false);



    useEffect(() => {
        setMessages(chatMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [chatMessages]);

    useEffect(() => {
        const pusher = new Pusher('6b5d410bac4156a5c4c5', {
            cluster: 'eu',
            authEndpoint: appUrl + '/api/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json"
                }
            }
        });

        const channel = pusher.subscribe('presence-chat', {
            user_id: user.id,
            user_info: {
                name: user.id.name,
                email: user.email,
            },
        });

        channel.bind('message', function (message) {

            const item = {
                id: message.message.message_id,
                message: message.message.message,
                images: message.message.images,
                reciever_id: message.message.reciever_id,
                sender_id: message.message.sender_id,
                created_at: message.message.created_at,
                is_read: message.message.is_read,
            };

            if (item.reciever_id === user.id) {
                setMessages([item, ...messages]);
                notify(item.message);
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        });

        return () => {
            pusher.unsubscribe('presence-chat');
        };
    }, []);


    const notify = (message) => toast(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });





    const sendMessage = () => {
        setSending(true);
        const payload = {
            sender_id: user.id,
            reciever_id: secondUser.id,
            message: message,
            images: images
        };
        axiosClient.post('/send_message', payload).then((data) => {
            if (data.data.success) {
                const newMessage = data.data.data;
                setMessages([newMessage, ...messages]);
                console.log('message send status: ' + data.data.success);
                setMessage('');
                setImages([]);
                setSending(false);
            }
        }).catch((err) => { console.log(err);   setSending(false); });

        
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

    }
    const handleFiles = (files) => {
        setImages(files.base64);
    };


    const dates = new Set();

    const renderDate = (chat, dateNum) => {
        dates.add(dateNum);
        return (
            <Box elevation={2} sx={{ width: 'fit-content', margin: 'auto', p: 1 }} justifyContent="center" >
                {dateNum}
            </Box>)
    };



    return (
        <>
            <Box sx={{ width: '100%', }}>

                {secondUser.id ?
                    <UserHeader secondUser={secondUser} />
                    :
                    <DefaultHeader />
                }
                <Divider orientation="horizontal" flexItem sx={{ marginTop: 2 }} />


                <CardContent sx={{
                    overflowY: 'auto', height: '530px', display: 'flex',
                    flexDirection: 'column-reverse',
                }}>
                    <div ref={messagesEndRef} style={{ margin: '10px' }} />
                    {
                        messages.map((message) => {
                            const chatDate = message.created_at.substring(0, 10);

                            return (
                                <Fragment key={message.id}>
                                    <ChatMessageItem key={message.id} messageItem={message} />
                                    {dates.has(chatDate) ? null : renderDate(message, chatDate)}

                                </Fragment >

                            )
                        })
                    }

                </CardContent>
                <Divider orientation="horizontal" flexItem />
                {
                    images.map((img) => {
                        return (

                            <img key={img} src={img} height={'200px'} alt={"message".img} />

                        )
                    })
                }
                {secondUser.id ?
                    <CardActions>
                    <ReactFileReader multipleFiles fileTypes={[".png", ".jpg"]} base64 handleFiles={handleFiles} >
                        <IconButton variant="contained" ><AddAPhotoIcon /> </IconButton>
                    </ReactFileReader>

                    <Box sx={{ paddingX: 2, width: '100%', backgroundColor: 'background.default', borderRadius: 3, m: 1 }}>
                        <InputBase
                            onChange={(e) => { setMessage(e.target.value) }}
                            value={message}
                            sx={{ ml: 1, flex: 1, width: '100%', height: '40px', }}
                            placeholder="Type in here…"
                            inputProps={{ 'aria-label': 'search Chat' }}
                        />
                    </Box>

                    {
                        sending
                        ?
                        <IconButton ><CircularProgress /></IconButton>
                        :
                        <IconButton onClick={sendMessage} ><Send /></IconButton>
                        

                    }
                    
                </CardActions>
                    :
                    null
                }
            </Box>

        </>
    )
}