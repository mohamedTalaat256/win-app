import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link, } from "react-router-dom";


export default function Header() {
    return (
        <Box sx={{backgroundColor: 'background.paper'}}>
        <Container >

            <Grid container spacing={1} columns={12} sx={{ height: '100%',marginTop:2 }}>
                
            <Grid item xs={12} xl={6} md={6}>
                    <Box
                        width={'100%'}
                        marginY={'100px'}
                        marginX={'20px'}
                        color={'text.secondary'}
                     
                        >

                        <Typography gutterBottom sx={{ fontSize: '2.5rem' }}>Discount <span style={{  }}>20%</span>  For All Orders
                        </Typography>

                        <Typography variant="h3" gutterBottom>Over $2000 </Typography>

                        <Typography variant="subtitle1"> Use coupon codeDISCOUNT20 </Typography>

                        <Link className='text-link' to={'/shop_now'}>
                        <Button variant='contained' size='large' color='primary' sx={{ marginY: 2 }}>SHOP NOW</Button></Link>
                        <Box  sx={{ display: { xs: 'flex', md: 'none' } }} >
                        <img src='./assets/background.png'/>

                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} xl={6} md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box sx={{
                        width: '100%',
                        marginTop: '10px',
                        height: 600,
                        backgroundImage: 'url(./assets/background.png)',
                    }}>
                        <Typography variant="h3" >

                        </Typography>
                    </Box>
                </Grid>
                
            </Grid>
        </Container>
        </Box>
    );
}