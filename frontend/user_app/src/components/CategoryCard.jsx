import { AddBoxOutlined, StarBorderRounded } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from 'react-router-dom';
import appUrl from "../appUrl";
import imagesUrl from "../imagesUrl";

export default function CategoryCard(props) {

    const backgroundImage = imagesUrl + props.props.image;
    return (
        <>
            <Card elevation={1}
                sx={{
                    maxWidth: '100%', padding: 1, margin: 2, borderRadius: 4
                }} key={props.props.id}>


                <Link to={'/category/' + props.props.id} style={{ textDecoration: 'none', color: 'inherit', }}>


                    <Box
                        sx={{
                            height: '120px',
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: 3,
                            padding: '2px'

                        }}
                    >

                        <CardActions disableSpacing sx={{ padding: 0, marginY: 1 }} width={'100%'}>

                            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" width={'100%'} >
                                <Box sx={{ backgroundColor: '#3c3869', paddingX: 2, borderRadius: 8, paddingY: 0 }} >
                                    <Typography variant="subtitle2" color={'white'}>
                                        {props.props.name}
                                    </Typography>
                                </Box>


                                <Box sx={{ backgroundColor: '#d9d9d9', paddingX: 2, borderRadius: 8, paddingY: 0 }} >
                                    <Typography variant="subtitle2" color={''}>
                                        3k order this week
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardActions>
                    </Box>

                </Link>



            </Card>
        </>
    )

}