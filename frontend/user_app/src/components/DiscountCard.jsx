import { AddBoxOutlined, StarBorderRounded } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import StarRateIcon from '@mui/icons-material/StarRate';
import appUrl from "../appUrl";
import { Link } from "react-router-dom";
import imagesUrl from "../imagesUrl";

export default function DiscountCard (props) {
    const backgroundImage = imagesUrl+ props.props.images;
    return (
        <>
            <Card elevation={1} sx={{  maxWidth: '100%', padding: 2, margin:1, borderRadius: 2}} key={props.props.id}>
         

            <Link to={'/product/' + props.props.id} >
                <CardMedia
                    sx={{backgroundColor: '', }}
                    component="img"
                    height="70%"
                    image={backgroundImage}
                    alt="Paella dish"
                />
                </Link>
                
                <CardContent sx={{padding: 0}}>

                    <Typography variant="subtitle2" color={'secandry'}   sx={{fontWeight: 'bold'}}>
                       {props.props.name}
                    </Typography>
                    
                </CardContent>
                <CardActions disableSpacing sx={{padding: 0, marginY: 1}} width={'100%'}>
                    <Stack direction={'column'} spacing={2} width={'100%'}>
                       
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" width={'100%'} >
                            <Typography variant="subtitle1" color={'error'}>
                                ${props.props.price}
                            </Typography>

                            <Typography  variant="subtitle1" color={'secandry'} >
                                ${props.props.price - (props.props.price * (props.props.discount / 100))}
                            </Typography>
                        </Stack>


                        
                    </Stack>
                    

                </CardActions>

            </Card>
        </>
    )

}