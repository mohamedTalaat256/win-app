import { AddBoxOutlined, StarBorderRounded } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import appUrl from "../appUrl";
import { Link } from 'react-router-dom';
import imagesUrl from "../imagesUrl";

export default function ProductCard(props) {
    const backgroundImage = imagesUrl+ props.props.images;
    return (
            <Card elevation={1} sx={{ maxWidth: '100%', padding: 2, margin: 2, borderRadius: 2 }} key={props.props.id}>

                <CardActions disableSpacing sx={{ padding: 0, marginY: 0 }} width={'100%'}>

                    <Box sx={{ backgroundColor: '#D23F57', paddingX: 2, borderRadius: 10, paddingY: 0 }} >
                        <Typography variant="subtitle2" color={'white'}>
                            {props.props.discount}%off
                        </Typography>
                    </Box>


                </CardActions>

                <Link to={'/product/' + props.props.id}>
                    <CardMedia
                        sx={{ backgroundColor: '', }}
                        component="img"
                        height="30%"
                        image={backgroundImage}
                        alt="Paella dish"
                    />
                </Link>


                <CardContent sx={{ padding: 0 }}>

                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {props.props.name}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing sx={{ padding: 0, marginY: 1 }} width={'100%'}>
                    <Stack direction={'column'} spacing={2} width={'100%'}>
                        <Rating name="read-only" value={props.props.rating} readOnly />

                        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" width={'100%'} >
                            <Typography variant="subtitle1" color={'error'} gutterBottom sx={{ fontWeight: 'bold' }}>
                                ${props.props.price}
                            </Typography>

                            <Typography variant="subtitle1" color={'secandry'} gutterBottom sx={{ fontWeight: 'bold' }}>
                                ${props.props.price - (props.props.price * 0.2)}
                            </Typography>

                            <IconButton>
                                <AddBoxOutlined fontSize="large" color="warning" />
                            </IconButton>


                        </Stack>



                    </Stack>


                </CardActions>

            </Card>
    )

}