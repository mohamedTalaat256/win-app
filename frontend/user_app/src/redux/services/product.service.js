import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';




export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosClient.get('/products');
    return response.data.data;
  }
);

