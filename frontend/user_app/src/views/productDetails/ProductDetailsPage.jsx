import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, Rating, Tab, Typography, useTheme } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashDeals from '../home/components/FlashDeals';
import appUrl from "../../appUrl";
import axiosClient from "../../axios-client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SpecificationTap from "./components/SpecificationTap";
import ReviewsTap from "./components/ReviewsTap";
import { ContextProvider, useStateContext } from "../../context/ContextProvider";
import imagesUrl from "../../imagesUrl";

export default function ProductDetailsPage(props) {

    const { id } = useParams();
    const productId = id;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [index, setIndex] = useState('');
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('1');


    const { user, cartCount, setCartCount, cartTotal, setCartTotal } = useStateContext(ContextProvider);

    const [formData, setFormData] = useState({});
    const theme = useTheme();


    const onSelectImage = (index) => {
        setSelectedImage(imagesUrl + index);
        setIndex(index);
    }
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        setLoading(true);
        axiosClient.get('products/'+ productId).then(({ data }) => {


            console.log(data);
            setProduct(data.data);
            setSelectedImage(imagesUrl+ data.data.images);

            setIndex(data.data.images);

            setImages([data.data.images]);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);

        })


    }


    function addToCart(price) {
        formData.userId = user.id;
        formData.amount = 1;
        formData.productId = productId;


        setAddingToCart(true);

        axiosClient.post('/carts/insert', formData)
            .then(({ data }) => {


                if (data.success) {
                    setAddingToCart(false);
                    setCartCount(Number(cartCount+1));
                    setCartTotal(Number(cartTotal+ price) );
                }
            })
            .catch((err) => {
                setAddingToCart(false);
            });
    }


    return (

        <Container sx={{ marginTop: '140px', }}>
            {
                loading ?
                    <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
                    :
                    <Box>
                        <Grid container spacing={1} columns={12}>
                            <Grid item xs={12} xl={6} md={6}>

                                <Box sx={{ paddingBottom: 4, position: 'relative' }} >
                                    <CardMedia
                                        sx={{ height: '300px', width: 'auto', margin: 'auto' }}
                                        component="img"
                                        height="50%"
                                        image={selectedImage}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Stack direction={'row'} sx={{ marginTop: 5, }} >
                                            {images.map((image) => {

                                                return (
                                                        <Card key={image} elevation={1}
                                                            sx={{
                                                                height: '80px',
                                                                width: '80px',
                                                                maxWidth: '100%',
                                                                borderRadius: 1,
                                                                marginX: 1,
                                                                border: image === index ? 1 : 0,
                                                                borderColor: 'error.main'

                                                            }}>
                                                            <CardMedia
                                                                onClick={() => { onSelectImage(image) }}
                                                                sx={{ backgroundColor: '#e5e4e4' }}
                                                                component="img"
                                                                height="100%"
                                                                image={imagesUrl+ image}
                                                                alt={product.name}
                                                            />
                                                        </Card>
                                                );
                                            })}
                                        </Stack>

                                    </CardContent>


                                </Box>
                            </Grid>

                            <Grid item xs={12} xl={6} md={6}>
                                <Stack direction={'column'} spacing={1}>
                                    <Typography variant="h2" color={'default'}>{product.name}</Typography>
                                    <Typography variant="subtitle2" color={'default'}> Brand: apple</Typography>
                                    <Rating name="read-only" value={product.rating} readOnly />
                                    <Typography variant="h2" color={'error'} sx={{ fontWeight: 'bold' }}>${product.price}</Typography>
                                    <Typography variant="subtitle2" color={'default'}>Stock Avialable : {product.stockQti}</Typography>

                                    {
                                        addingToCart
                                            ?
                                            <Button variant="contained" size="medium" color="error">
                                                <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
                                                Adding...

                                            </Button>
                                            :
                                            <Button variant="contained" onClick={()=>{addToCart(product.price)}} size="medium" color="error">Add To Card</Button>

                                    }
                                </Stack>
                            </Grid>
                        </Grid>

                         <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', color: theme.palette.error.main }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                    textColor="inherit"
                                    indicatorColor="primary"
                                >
                                    <Tab label="Description" value="1" />
                                    <Tab label="Reviews" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <SpecificationTap productSpecification={product.specifications} />
                            </TabPanel>
                            <TabPanel value="2">
                                <Grid columns={12}>
                                    <Grid item xs={12} xl={6} md={6}>
                                        <ReviewsTap pId={product.id} />
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext> 



                        <FlashDeals />
                    </Box>
            }
        </Container>


    )
}