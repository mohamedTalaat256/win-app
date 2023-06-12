
import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Stack } from '@mui/system';
import { ArrowForwardIos } from '@mui/icons-material';
import ProductCard from '../../../components/ProductCard';
import { fetchProducts } from '../../../redux/services/product.service';
import { useDispatch, useSelector } from 'react-redux';


export default function MoreForYou() {

    const products = useSelector((state) => state.products.data);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);



    return (
        <Stack direction={'column'}>
            <div style={{ marginBottom: '40px' }}>

                <Stack direction={'row'} justifyContent="space-between" alignItems="flex-end" >
                    <Typography variant="h5" color='primary' gutterBottom my={3} sx={{ fontWeight: 'bold' }}>
                        More For You
                    </Typography>
                    <Typography variant="subtitle2" color='primary' gutterBottom my={3}>
                        view more  <ArrowForwardIos fontSize='small' />
                    </Typography>
                </Stack>


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
                                    <Grid container spacing={2} columns={12} >

                                        {products.map((product) => {
                                            return (
                                                    <Grid item xs={12} xl={3} md={4} key={product.id}>
                                                        <ProductCard props={product} />
                                                    </Grid>
                                            );
                                        })}

                                    </Grid>


                            }
                        </>
                }
            </div>
        </Stack>


    );
}