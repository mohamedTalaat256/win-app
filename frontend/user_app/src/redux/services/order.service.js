import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';




export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId) => {
    const response = await axiosClient.get('orders/index/'+ userId);
    return response.data.data;
  }
);

