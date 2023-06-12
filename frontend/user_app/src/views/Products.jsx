import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import axiosClient from '../axios-client';

import { useState, useEffect } from 'react';


const  ProductCard =(props) => {
    console.log(props);
    return (
        <>
            <Card elevation={0} sx={{ maxWidth: '100%' }} key={props.props.id}>

                <CardMedia
                    component="img"
                    height="350"
                    image={'http://127.0.0.1:8080/media/images/'+props.props.image}
                    alt="Paella dish"
                />
                <CardContent sx={{padding: 0}}>

                    <Typography variant="h6" color="#404040" gutterBottom my={2}>
                       {props.props.name}
                    </Typography>

                    <Typography variant="body2" color="#404040">{props.props.describtion}</Typography>
                </CardContent>
                <CardActions disableSpacing sx={{padding: 0, marginY: 3}}>
                    <Button sx={{
                        borderRadius: 0 ,
                        backgroundColor: '#3a3a3a', color: '#ffffff', '&:hover': {
                            backgroundColor: '#6a6969'
                        },
                    }} ><Typography variant="button" gutterBottom>
                            SHOP KID
                        </Typography></Button>

                </CardActions>

            </Card>
        </>
    )

}



export default function Products() {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories();
      }, []);
    
      function getCategories(){
        axiosClient.get('categories/index').then(({ data }) => {
            setCategories(data.data);
    
        }).catch((err) => {
            console.log(err);
          })
      }




    return (
        <Container>
            <Box sx={{
                    width: '100%',
                    marginTop: '20px',
                }} >
                <Grid container spacing={2} columns={12}>
                   
                        {categories.map((product) => {
                            return (
                                <>
                                   <Grid item xs={12} xl={4} md={6}>
                                        <ProductCard props={product} />
                                    </Grid>
                                </>
                            );
                        })}
                </Grid>
            </Box>
        </Container>
    );
}