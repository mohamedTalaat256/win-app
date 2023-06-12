import { useEffect, useReducer, useState } from "react";
import ReviewCard from './ReviewCard';
import WriteReviewCard from './WriteReviewCard';
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteProductReviews, fetchProductReviews } from "../../../redux/services/review.service";
import { Box, CircularProgress, Container, IconButton, Stack, Typography } from "@mui/material";
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";
import { RemoveCircleSharp } from "@mui/icons-material";



function ReviewsTap({ pId }) {
    const { user } = useStateContext(ContextProvider);
    const reviews = useSelector((state) => state.review.reviews);
    const error = useSelector((state) => state.review.error);
    const loading = useSelector((state) => state.review.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductReviews(pId));
    }, [dispatch]);


     return (
        <>

            {
                loading
                    ?
                    <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
                    :
                    <>
                        {
                            error
                                ?
                                <Typography variant="subtitle2" align="center" color='error' my={10}>{error}</Typography>
                                :
                                <>
                                    {
                                        reviews.map((review) => {
                                            return (
                                                    <Stack direction={'row'} alignItems={'center'} key={review.id} >
                                                        <ReviewCard review={review} />
                                                        {
                                                            Number(user.id) === review.user.id ?
                                                                <IconButton color='error' 
                                                                    onClick={()=>{dispatch(deleteProductReviews(review.id))}}>
                                                                    <RemoveCircleSharp />
                                                                </IconButton>
                                                                :
                                                                <></>
                                                        }
                                                    </Stack>
                                            )
                                        })
                                    }
                                </>
                        }
                    </>


            }
            <Box maxWidth="xs">
            <WriteReviewCard pId={ pId} />

            </Box>

        </>
    )
}


export default ReviewsTap;

