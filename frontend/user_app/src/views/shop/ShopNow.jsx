import Box from '@mui/material/Box';
import { Card, CardActions, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { useParams } from 'react-router-dom';
import ShopNowHeader from './components/ShopNowHeader';
import ProductCard from '../../components/ProductCard';
import baseUrl from '../../appUrl';
import imagesUrl from '../../imagesUrl';

export default function ShopNow() {

    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [atrributes, setAtrributes] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [loading, setLoading] = useState(false);


    const [category, setCategory] = useState({});

    useEffect(() => {
        getProducts();
        getAttributes();
    }, []);

    function getProducts() {
        setLoading(true);
        axiosClient.get('products/find_by_category_id/' + categoryId).then(({ data }) => {
            setProducts(data.data);
            setLoading(false);
            setCategory(data.data[0].category);

        }).catch((err) => {
            console.log(err);
            setLoading(false);

        })
    }

    function getAttributes() {
        axiosClient.get('attribute_groups/' + categoryId).then(({ data }) => {
            setAtrributes(data.data);
            console.log(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handelSpecificationChange = (attrKey, attrValue) => {


        var item = {};
        item.skey = attrKey;
        item.svalue = attrValue;

        console.clear();


        const index = specifications.findIndex(i => i[attrKey] === attrValue);

        console.log('index');
        console.log(index);

        if (index !== -1) {
            specifications.splice(index, 1);
        } else {
            specifications.push({ skey: attrKey, svalue: attrValue });
        }









        setSpecifications([...specifications]);


        // console.log(specifications);
        filterProducts();

    }

    function filterProducts() {



        const payLoad = {
            categoryId: Number(categoryId),
            specifications: specifications
        }

        setLoading(true);
        axiosClient.post('products/filter', payLoad).then(({ data }) => {
            setProducts(data.data);

            console.log(data.data);
            setLoading(false);

        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }


    return (

        <Container>
            <Card elevation={1}
                sx={{
                    maxWidth: '100%', padding: 1, borderRadius: 4, mt:12
                }} >
                <Box
                    sx={{
                        height: '160px',
                        backgroundImage: `url(${imagesUrl + category.image})`,
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
                                    {category.name}
                                </Typography>
                            </Box>


                            <Box sx={{ backgroundColor: '#d9d9d9', paddingX: 2, borderRadius: 8, paddingY: 0 }} >
                                <Typography variant="subtitle2" color={''}>
                                {products.length} results found
                                </Typography>
                            </Box>
                        </Stack>
                    </CardActions>
                </Box>



            </Card>
            <Box sx={{ width: '100%', marginTop: '20px' }} >

                <Grid container spacing={1} columns={12}>
                    <Grid item xs={12} xl={3} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {
                            atrributes.map((atrribute) => {
                                return (
                                    <Card key={atrribute.attrKey} sx={{ display: 'flex', marginY: 2 }}>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormLabel> <Typography variant='subtitle1' sx={{ my: 2 }}>{atrribute.attrKey}</Typography> </FormLabel>
                                            <Divider sx={{ width: '100%' }} />
                                            <FormGroup>
                                                {
                                                    atrribute.attrValues.split(',').map((value) => {
                                                        return (
                                                            <FormControlLabel
                                                                key={value}
                                                                control={
                                                                    <Checkbox onChange={(e) => { handelSpecificationChange(atrribute.attrKey.trim(), e.target.name) }} name={value.trim()} color='default' />
                                                                }
                                                                label={value}
                                                            />
                                                        )
                                                    })
                                                }

                                            </FormGroup>
                                        </FormControl>
                                    </Card>
                                )
                            })
                        }

                    </Grid>
                    <Grid item xs={12} xl={3} sx={{ display: { xs: 'flex', md: 'none' } }}>

                        <Box >
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                    </Grid>
                    <Grid item xs={8} xl={8} md={9}>
                        {
                            loading ?
                                <CircularProgress sx={{ display: 'flex', margin: 'auto', marginTop: 20 }} />

                                :
                                <Grid container spacing={1} columns={12}>

                                    {products.map((p) => {
                                        return (

                                            <Grid key={p.id} item xs={12} xl={4} md={6}>
                                                <ProductCard props={p} />
                                            </Grid>

                                        );
                                    })}
                                </Grid>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
