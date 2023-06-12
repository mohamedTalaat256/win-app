import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';


export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",  async (productId) => {
    const response = await axiosClient.get('reviews/'+productId);
 //   console.log(response.data.data);
    return response.data.data;
  }
);



export const addProductReviews = createAsyncThunk(
  "reviews/addProductReviews",
  async (formData) => {
   // console.log(formData);

    const response = await axiosClient.post('/reviews/insert', formData);

    return response.data.data;
  }
);


export const deleteProductReviews = createAsyncThunk(
  "reviews/deleteProductReviews",
  async (reviewId) => {

    const response = await axiosClient.delete('/reviews/delete/'+reviewId);

    return response.data.data;
  }
);

