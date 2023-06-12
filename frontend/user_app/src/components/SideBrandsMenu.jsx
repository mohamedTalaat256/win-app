import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Divider, Grid, Card, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';


export default function SideBrandsMenu() {


    const brands = [
        {
            name: 'Ferrary',
            image: './assets/ferrari.png'
        },
        {
            name: 'Bmw',
            image: './assets/bmw.png'
        },
        {
            name: 'Tesla',
            image: './assets/tesla.png'
        },
        {
            name: 'Toyota',
            image: './assets/toyota.png'
        },
        {
            name: 'Mini',
            image: './assets/mini.png'
        },
        {
            name: 'Ford',
            image: './assets/ford.png'
        },
    ]
    return (
        <>
            <Box sx={{ width: '100%', maxWidth: 360 }}>
                <Card elevation={1} sx={{ padding: 2}}>
                    <List component="nav" aria-label="main mailbox folders">
                        {brands.map((brand) => {
                            return (
                                    <ListItemButton key={brand.name} elevation={1} sx={{ backgroundColor: 'background.default', borderRadius: 2, margin:0, marginY:2}}>
                                        <ListItemIcon>
                                            <img src={brand.image} />
                                        </ListItemIcon>
                                        <ListItemText primary={brand.name} />
                                    </ListItemButton>
                                  /*   <br /> */
                            );
                        })}
                    </List>
                </Card>
            </Box>
        </>
    )
}