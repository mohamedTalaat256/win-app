import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';




export const fetchUserCart = createAsyncThunk(
  "carts/fetchUserCart",
  async (userId) => {
    const response = await axiosClient.get('carts/'+ userId);

    console.log(response.data);
    return response.data.data;
  }
);

