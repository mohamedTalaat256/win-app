import { Card, CardActions, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/services/order.service";
import { ContextProvider, useStateContext } from "../../context/ContextProvider";




const Orders = () => {
    const { user } = useStateContext(ContextProvider);


    const orders = useSelector((state)=>state.orders.data);
    const loading = useSelector((state)=>state.orders.loading);
    const error = useSelector((state)=>state.orders.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserOrders(user.id));


    }, [dispatch])


    return (
        <>
            <Container sx={{ marginTop: 14 }}>
                <Card elevation={1}>
                    <CardActions>
                        <Typography variant="h5" color={'text.secondary'} >My Orders</Typography>
                    </CardActions>

                   

                    <TableContainer component={Paper} elevation={0}>
                        <Table sx={{ minWidth: 650, }} >
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">AMOUNT</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                    <TableCell align="center">TRANSACTIO ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading
                                    ?
                                    <Typography variant="h5" color={'text.secondary'} >loading....</Typography>


                                    :
                                    <>
                                        {
                                            error
                                            ?
                                            <Typography variant="h5" color={'text.secondary'} >My Orders</Typography>
                                            :
                                            orders.map((order)=>{
                                                return(
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                        <TableCell align="center">{order.id}</TableCell>
                                                        <TableCell align="center">{order.amount}</TableCell>
                                                        <TableCell align="center">{order.status}</TableCell>
                                                        <TableCell align="center">{order.transaction_id}</TableCell>
                                                    </TableRow>
                                                )

                                            })
                                            
                                            
                                        }
                                    </>
                                    
                                }
                               


                            </TableBody>
                        </Table>
                    </TableContainer>

                </Card>
            </Container>
        </>
    )

}


export default Orders;