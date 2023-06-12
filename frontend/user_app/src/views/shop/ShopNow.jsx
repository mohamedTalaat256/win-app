import Box from '@mui/material/Box';
import { Card, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import DiscountCard from '../../components/DiscountCard';
import axiosClient from '../../axios-client';
import { useParams } from 'react-router-dom';
import ShopNowHeader from './components/ShopNowHeader';
import ProductCard from '../../components/ProductCard';


export default function ShopNow() {
    
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [atrributes, setAtrributes] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
        getAttributes();
    }, []);

    function getProducts() {
        setLoading(true);
        axiosClient.get('category_products/index/' + categoryId).then(({ data }) => {
            setProducts(data.data);
            setLoading(false);

        }).catch((err) => {
            console.log(err);
            setLoading(false);

        })
    }

    function getAttributes() {
        axiosClient.get('attribute_group/index/' + categoryId).then(({ data }) => {
            setAtrributes(data.data);
            console.log(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handelSpecificationChange = (key, value) => {


        var item = {};
        item.key = key;
        item.value = value;

        console.clear();
        const index = specifications.findIndex(item => item[key] === value);
        if (index !== -1) {
            specifications.splice(index, 1);
        } else {
            specifications.push({ [key]: value });
        }
        setSpecifications([...specifications]);


        console.log(specifications);
        filterProducts();

    }

    function filterProducts() {
        const payLoad = {
            category_id: categoryId,
            atrributes: specifications
        }

        setLoading(true);
        axiosClient.post('products/filter', payLoad).then(({ data }) => {
            setProducts(data.data);
            setLoading(false);

        }).catch((err) => {
            console.log(err);
            setLoading(false);

        })
    }

    return (
        <>
            <Container>
                <ShopNowHeader />
                <Box sx={{ width: '100%', marginTop: '20px' }} >

                    <Grid container spacing={1} columns={12}>
                        <Grid item xs={12} xl={3} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {
                                atrributes.map((atrribute) => {
                                    return (
                                        <Card  sx={{ display: 'flex', marginY: 2}}>
                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                <FormLabel> <Typography variant='subtitle1'>{atrribute.key}</Typography> </FormLabel>
                                                <Divider sx={{ width: '100%' }} />
                                                <FormGroup>
                                                    {
                                                        atrribute.values.split(',').map((value) => {
                                                            return (
                                                                <>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox onChange={(e) => { handelSpecificationChange(atrribute.key, e.target.name) }} name={value} color='default' />
                                                                        }
                                                                        label={value}
                                                                    />
                                                                </>
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
                                                <>
                                                    <Grid key={p.id} item xs={12} xl={4} md={6}>
                                                        <ProductCard props={p} />
                                                    </Grid>
                                                </>
                                            );
                                        })}
                                    </Grid>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
