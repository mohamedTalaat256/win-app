import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';




export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axiosClient.get('categories');
    return response.data.data;
  }
);

