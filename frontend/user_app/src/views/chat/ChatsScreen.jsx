import { Box, Button, Card, CardActions, CircularProgress, Container, Grid, ListItemIcon, ListItemText, MenuList, Paper, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Divider, Avatar, Stack, IconButton, Badge, FormControlLabel, Switch, Collapse, Slide } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContextProvider, useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Messages from "./components/Messages";
import { Helmet } from "react-helmet-async";
import Pusher from 'pusher-js';
import appUrl from "../../appUrl";
import axiosClient from "../../axios-client";
import ViewListIcon from '@mui/icons-material/ViewList';
import useScreenType from "react-screentype-hook";
import { TransitionGroup } from 'react-transition-group';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { fetchUserChats } from "../../redux/services/chat.servise";
const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
        <Box component="svg" sx={{ width: 100, height: 100 }}>
            <Box
                component="polygon"
                sx={{
                    fill: (theme) => theme.palette.common.white,
                    stroke: (theme) => theme.palette.divider,
                    strokeWidth: 1,
                }}
                points="0,100 50,00, 100,100"
            />
        </Box>
    </Paper>
);

const ChatsScreen = () => {
    const { user, token } = useStateContext(ContextProvider);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);


    const [checked, setChecked] = useState(false);
    const containerRef = useRef(null);
    const handleChange = () => setChecked((prev) => !prev);

    const screenType = useScreenType();

    const chats = useSelector((state)=>state.chat.chats);
    const loading = useSelector((state)=>state.chat.loading);
    const error = useSelector((state)=>state.chat.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserChats(user.id));
        
    }, [dispatch]);

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
            //update seen message to seen
            axiosClient.post('/update_to_seen_message', {
                message_id: message.message_id
            }).then((data) => {
                
            }).catch((err) => { console.log(err); });


            dispatch(fetchUserChats(user.id));
            console.log(message);
        });

        return () => {
            pusher.unsubscribe('presence-chat');
        };
    }, []);



    function getUserInfo(secondPersonId) {

        axiosClient.get('/get_user?user_id=' + secondPersonId).then((data) => {

            setSelectedUser(data.data.data);
        }).catch((err) => { console.log(err) });

    }

    const filteredChats = chats.filter((chat) => {
        return chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    });





    const handlechange = (index) => {
        const newFilteredChats = [...filteredChats];
        newFilteredChats[index].unread = 0;
      //  filteredChats  = newFilteredChats;

        ///chats[index].unread = 0;
    };



    function setUserMessages(secondPersonId, index) {

        getUserInfo(secondPersonId);
        axiosClient.get('/chat_messages?user_id=' + user.id + '&second_person_id=' + secondPersonId).then((data) => {
            handlechange(index);
            setMessages(data.data.data);
            setChecked(true);


        }).catch((err) => { console.log(err) });
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

 


    const ChatsScreen = () => {
        return (

            <Box sx={{ width: '100%', }}>
                <Box sx={{ paddingX: 2, backgroundColor: 'background.default', borderRadius: 3, m: 2, minWidth: '280px' }}>

                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        onChange={handleSearch}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Chat"
                        inputProps={{ 'aria-label': 'search Chat' }}
                    />

                </Box>

                <Box sx={{ height: '600px', marginTop: 2, overflowY: 'scroll', }}>
                    {
                        loading
                        ?
                        <CircularProgress/>
                        :
                        <MenuList sx={{ flexDirection: 'column-reverse' }}>
                        {
                            filteredChats.map((chat, index) => {
                                return (
                                    <MenuItem
                                      
                                        onClick={() => {

                                            setUserMessages(chat.id, index);
                                        }}
                                        key={chat.last_message_id} 
                                        
                                        sx={{ paddingX: 2, m:2, borderRadius: 2, 
                                            backgroundColor: selectedUser.id === chat.id? '#cfcfcf': null 
                                        }}>
                                        <ListItemIcon>
                                            <Badge
                                                overlap="circular"
                                                color="error"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={chat.unread}
                                            >
                                                <Avatar src={appUrl + 'media/images/' + chat.image} sx={
                                                    { marginX: 2, width: '60px', height: '60px' }
                                                } />
                                            </Badge>
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Stack direction={'column'}>
                                                <Typography variant="subtitle1" color="background.invert">
                                                    {chat.name}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {chat.last_message}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {chat.last_message_id}
                                                </Typography>
                                                

                                            </Stack>

                                        </ListItemText>

                                    </MenuItem>
                                )
                            })
                        }



                    </MenuList>

                    }
                    
                </Box>

            </Box>

        )
    }

    return (
        <>
            <Helmet>
                <title> Chats </title>
            </Helmet>
            <Box>
                <Container sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Card elevation={1} >
                        <CardActions>
                            {
                                screenType.isMobile?
                                <IconButton onClick={handleChange} >
                                    <ArrowBackIosNewIcon/>
                                </IconButton>
                                :
                                null
                            }

                            <Typography variant="h3" sx={{ m: 3 }} color={'text.secondary'} >Chats</Typography>

                        </CardActions>
                        {
                            screenType.isMobile
                                ?
                                <>
                                    <Box sx={{ width: '100%', height: '100%', }} ref={containerRef} >
                                        <TransitionGroup>
                                            {checked ? <Messages chatMessages={messages} secondUser={selectedUser} /> : <ChatsScreen />}
                                        </TransitionGroup>
                                    </Box>
                                </>
                                :
                                <>
                                    <Grid container spacing={1} columns={12}>
                                        
                                        <Grid item xs={12} xl={4} md={4} >
                                            <ChatsScreen />
                                            <Divider orientation="vertical" flexItem variant="middle" />
                                        
                                        </Grid>
                                        
                                        <Grid item xs={12} xl={8} md={8} >
                                            
                                            <Messages chatMessages={messages} secondUser={selectedUser} />
                                        </Grid>
                                    </Grid>
                                </>

                        }
                    </Card>
                </Container>
            </Box>
        </>
    )
}

export default ChatsScreen;