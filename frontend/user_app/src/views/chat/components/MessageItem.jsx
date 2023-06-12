import { Box, Card, CardMedia, Typography } from "@mui/material";

import appUrl from "../../../appUrl";
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";


export default function ChatMessageItem({ messageItem }) {
    const { user } = useStateContext(ContextProvider);



    const date = new Date(messageItem.created_at);
    const timeString = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
    const amPm = date.toLocaleTimeString([], { hour: 'numeric', hour12: true }).slice(-2);

    const images = messageItem.images.split(',');


    return (
        <>

            <Box key={messageItem.id} display="flex" sx={{ my: 1 }} justifyContent={messageItem.sender_id === user.id ? "flex-end" : "flex-start"}>
                <Card elevation={1} sx={{ maxWidth: 1 / 2, backgroundColor: messageItem.sender_id === user.id ? '#ffe6e6' : '#BFD3FF' }}>
                    <Box >
                        <Typography sx={{ p: 1 }} color={'text.secondary'} variant="subtitle2">{messageItem.message}</Typography>


                        {
                            messageItem.images !== ''
                                ?

                                images.map((image) => {


                                    if (image !== '') {
                                        return (
                                            <CardMedia
                                                key={image}
                                                sx={{ padding: '6px', borderRadius: 3 }}

                                                component="img"
                                                height="194"
                                                image={appUrl + 'media/images/' + image}
                                                alt="chat media"
                                            />
                                        )
                                    }
                                })


                                :
                                <>
                                </>
                        }
                        <Typography sx={{ p: 1 }} color={'text.secondary'} variant="caption"> {timeString}</Typography>

                        {/* <span style={{ fontSize: '0.7rem', padding: '6px', fontStyle: 'italic', color: 'text.secondary' }}>
                            {timeString }
                        </span> */}
                    </Box>
                </Card>
            </Box>

        </>
    )
}