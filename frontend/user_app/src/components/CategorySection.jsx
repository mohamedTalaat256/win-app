import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Grid,Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ProductCard from '../components/ProductCard';
import axiosClient from '../axios-client';
import SideBrandsMenu from './SideBrandsMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/services/product.service';





export default function CategorySection() {
    const products = useSelector((state) => state.products.data);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <>

            <Box sx={{ width: '100%', marginTop: '20px' }} >

                <Grid container spacing={1} columns={12}>
                    <Grid item xs={12} xl={3} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <SideBrandsMenu />

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
                    <Grid item xs={12} xl={9} md={9}>

                    {
                    
                        loading
                        ?
                        <Typography variant="subtitle2" align="center" color='info' my={10}>loading.....</Typography>
                        :

                        <>
                            {
                                error
                                ?
                                <Typography variant="subtitle2" align="center" color='error' my={10}>{error}</Typography>
                                :
                                <Grid container columns={12}>
                                    {products.map((product) => {
                                        return (
                                            <Grid item xs={12} xl={4} md={4} key={product.id}>
                                                <ProductCard props={product} />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            }
                        </>
                    }
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
