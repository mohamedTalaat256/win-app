
import { AddBoxRounded, RemoveCircleSharp, } from '@mui/icons-material';
import { Stack, IconButton, Typography, TableCell } from '@mui/material';
import { useState } from 'react';
import { ContextProvider, useStateContext } from '../../../context/ContextProvider';



export default function CartTableRow(row) {

    const { user, cartCount, setCartCount, cartTotal, setCartTotal } = useStateContext(ContextProvider);

    const rowItem = row.row;
    const [qti, setQti] = useState(rowItem.amount);




    const incrementAmount =(newQti, newAmount)=>{
        setQti(newQti + 1);
        setCartTotal(Number(cartTotal)+ Number(newAmount));
    }


    const decrementAmount =(newQti, newAmount)=>{
        setQti(newQti - 1);
        setCartTotal(Number(cartTotal) - Number(newAmount));
    }

    return (
        <>

            <TableCell align="right"><Typography variant="subtitle1" >${rowItem.product.price}</Typography></TableCell>

            <TableCell align="right">
                <Stack key={rowItem.id} direction={'row'} justifyContent="space-between" alignItems="center" width={'100%'}>
                    <IconButton color='error' onClick={() => { incrementAmount(qti, rowItem.product.price * qti) }}>
                        <AddBoxRounded />
                    </IconButton>


                    <Typography variant="subtitle1" >
                        {qti}
                    </Typography>

                    <IconButton color='error' onClick={() => { decrementAmount(qti, rowItem.product.price * 1) }}>
                        <RemoveCircleSharp />
                    </IconButton>
                </Stack>

            </TableCell>


            <TableCell component="th" scope="row">
                <Typography variant="subtitle1" >${rowItem.product.price * qti}</Typography>
            </TableCell>
        </>


    );
}