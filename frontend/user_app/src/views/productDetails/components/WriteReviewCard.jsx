import { Box, Button, CircularProgress, Grid, Rating, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddReviewValidationSchema from './../../../validation/AddReviewValidationSchema';
import { ContextProvider, useStateContext } from './../../../context/ContextProvider';
import { addProductReviews, fetchProductReviews } from "../../../redux/services/review.service";
import { useDispatch, useSelector } from "react-redux";

export default function WriteReviewCard({ pId }) {

    const [ratingValue, setRatingValue] = useState(0);
    const { user } = useStateContext(ContextProvider);



    const data = useSelector((state) => state.review.reviews);
    const loading = useSelector(state => state.review.loading);
    const error = useSelector(state => state.review.error);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(AddReviewValidationSchema)
    });


    const onSubmit = formData => {
        

        formData.reviewValue = ratingValue;
        formData.productId = pId;
        formData.userId = user.id;

        dispatch(addProductReviews(formData));
        reset();

    };


     return (
        <>


            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ padding: 1, marginTop: 3 }}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Write a Review for this product</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Your Rating *</Typography>

                        <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Your Review *</Typography>


                        <TextField
                            id='review_text'
                            placeholder="Write A review Here"
                            multiline
                            rows={6}
                            variant="outlined"
                            {...register('text')}
                            error={errors.text}
                        />
                        <Typography color="primary"> {errors.text?.message}</Typography>

                        {
                            loading ?
                                <Button variant="contained" color="error">
                                    <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />

                                </Button>
                                :
                                <Button variant="contained" type="submit" color="error" >submit</Button>


                        }




                    </Stack>

                </Box>
            </form>
        </>
    ) 

}