import { AddBoxOutlined, StarBorderRounded } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import StarRateIcon from '@mui/icons-material/StarRate';
import appUrl from "../appUrl";
import imagesUrl from "../imagesUrl";

export default function NewArrivalCard (props) {
    const backgroundImage = imagesUrl+ props.props.images;
    return (
        <>
            <Box elevation={0} sx={{ width: '185px',height: '240px', padding:1}} key={props.props.id}>
                <CardMedia
                    sx={{backgroundColor: '#e5e4e4', borderRadius: 3}}
                    component="img"
                    height="80%"
                    image={backgroundImage}
                    alt="Paella dish"
                />
                
                <CardContent sx={{padding: 1}}>

                    <Typography variant="subtitle2">
                       {props.props.name}
                    </Typography>
                    <Typography variant="subtitle2" color={'error'} >
                                ${props.props.price}
                            </Typography>
                    
                </CardContent>
            </Box>
        </>
    )

}