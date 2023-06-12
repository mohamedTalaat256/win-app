import Box from '@mui/material/Box';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';

import { Container } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { ContextProvider, useStateContext } from '../../context/ContextProvider';
import CartTable from './components/CartTable';
import Payment from './components/payment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCart } from '../../redux/services/cart.service';

import { Link as RouterLink } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Stripe from "react-stripe-checkout";




export default function Cart() {
    const { user, setCartCount, cartTotal, setCartTotal } = useStateContext(ContextProvider);

    const cart = useSelector((state) => state.carts.data);
    const loading = useSelector((state) => state.carts.loading);
    const error = useSelector((state) => state.carts.error);
    const dispatch = useDispatch();
    const [showPayment, setShowPayment] = useState(false);






    useEffect(() => {
        dispatch(fetchUserCart(user.id));
        var tot = 0;
        cart.map((item) => { tot += (item.product.price * item.amount); });

        if(cart.lenght === 0){
            setCartCount(0);
            setCartTotal(0);
        }

        console.log(cart);
        console.log(cartTotal);


    }, [dispatch]);


    const handleShowPayment = (show) => {
        setShowPayment(show);
    }


    async function handleToken(token) {
        console.log(token);
        await axiosClient.post("/payment/charge", "", {
            headers: {
                token: token.id,
                amount: 500,
            },
        })
            .then(() => {
                alert("Payment Success");
            })
            .catch((error) => {
                alert(error);
            });
    }


    return (
        <>
            <Container>
                <Box sx={{ width: '100%', marginTop: '140px'}} >
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} xl={8} md={8}>
                            {
                                loading
                                    ?
                                    <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
                                    :
                                    <>
                                        {
                                            error
                                                ?
                                                <Typography variant='subtitle1'>  {error} </Typography>
                                                :
                                                <CartTable cart={cart} />
                                        }
                                    </>
                            }
                        </Grid>
                        <Grid item xs={12} xl={4} md={4} sx={{ color: 'text.secondary' }}>
                            <Box
                                width={'100%'}
                                marginY={'20px'}>

                                <Typography variant='h4'>
                                    Order summary
                                </Typography>
                            </Box>

                            <Stack direction='row' justifyContent="space-between" >
                                <Typography variant='subtitle1'>  Total </Typography>
                                <Typography variant='subtitle1'> ${cartTotal} </Typography>
                            </Stack>


                            {
                                cartTotal !== 0 ?

                                    <>
                                        <Stack direction='row' justifyContent="space-between" >
                                            {!showPayment && <Button fullWidth onClick={() => { handleShowPayment(true) }} variant='contained' color='warning' size='large' sx={{ marginY: 3 }}>chekout  ${cartTotal} </Button>}
                                            {showPayment && <Button fullWidth onClick={() => { handleShowPayment(false) }} variant='contained' size='large' sx={{ marginY: 3 }}>cancel </Button>}
                                        </Stack>

                                        {
                                        showPayment 
                                        && 

                                        
                                      /*   <Payment order_details={{ total: cartTotal }} /> */
                                      <Stripe
                                      ComponentClass=''
                                          stripeKey="pk_test_51LYUvnBVDibabXHisH0GvAI2H39DwKOoMLKVVVTNvqu4niaeCnMpQdJVkGQlPrOpDqjn6n6JBUpZt6tpr8swrH4u00IWn8PtCa"
                                          token={handleToken}
                                      />
                                        }
                                    </>
                                    :

                                    <Button to="/" size="large" variant="contained" fullWidth component={RouterLink} sx={{ marginY: 4 }}>
                                        add some items to cart
                                    </Button>

                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
