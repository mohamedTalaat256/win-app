import { Box, CardContent, CardMedia, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import CartTableRow from './CartTableRow';
import { RemoveCircleSharp } from '@mui/icons-material';
import TableCell from '@mui/material/TableCell';
import imagesUrl from '../../../imagesUrl';
import axiosClient from '../../../axios-client';
import { ContextProvider, useStateContext } from '../../../context/ContextProvider';

const ProductCard = (prop) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80 }}
                    image={imagesUrl + prop.props.product.images}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" >
                            {prop.props.product.name}
                        </Typography>
                        <Stack direction={'column'}>
                            {
                                prop.props.product.specifications.map((atrribute) => {
                                    return (<Typography variant='caption' key={atrribute.skey} >{atrribute.skey}: {atrribute.svalue}</Typography>)
                                })
                            }
                        </Stack>
                    </CardContent>
                </Box>
            </Box>
        </>
    )

}



export default function CartTable(props) {
    const { user, cartCount, setCartCount, cartTotal, setCartTotal } = useStateContext(ContextProvider);

    const [myCart, setMyCart] = useState(props.cart);


    const [deleteing, setDeleteing] = useState(false);
    const [currentId, setCurrentId] = useState(null);


    const deleteFromBackend = (id, rowTotal) => {

        setCurrentId(id);
        setDeleteing(true);


        axiosClient.delete('carts/delete/'+ id).then(({ data }) => {


            if (data.success) {
                deleteRowItemFromUI(id);
                setDeleteing(false);

                setCartCount(cartCount - 1);
                console.log('cart count');

                setCartTotal(cartTotal- rowTotal);

                console.log(data);
            }
        }).catch((err) => {
            setDeleteing(false);
        });

    }


    function deleteRowItemFromUI(id) {
        const updatedItems = myCart.filter(item => item.id !== id);
        setMyCart(updatedItems);
    }



    return (
        <Box>
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650, }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>PRODUCT</TableCell>
                            <TableCell align="right">PRICE</TableCell>
                            <TableCell align="right">QUANTITY</TableCell>
                            <TableCell align="right">TOTAL</TableCell>
                            <TableCell align="right"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {myCart.map((row) => (

                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <ProductCard props={row} key={row.id} />
                                </TableCell>
                                <CartTableRow row={row} key={row.id} />
                                <TableCell align="right">
                                    <IconButton color='error' onClick={() => { deleteFromBackend(row.id, row.amount * row.product_price ) }}>

                                        {
                                            deleteing && currentId=== row.id
                                            ?
                                                <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
                                                :
                                                <RemoveCircleSharp />
                                        }
                                    </IconButton>
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}