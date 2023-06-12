import { Avatar, Box, Card, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import appUrl from "../../../appUrl";

export default function UserHeader({ secondUser }) {

    return (
        <>

            <CardHeader
                avatar={
                    <Avatar src={appUrl + 'media/images/' + secondUser.image} sx={
                        { width: '60px', height: '60px' }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={secondUser.name}
                subheader={secondUser.status ? 'online' : 'online'}
            />

        </>
    )
}