import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/product.service";



const ProductSlice = createSlice({
  name:"products",
  initialState: {data: [], loading: false, error: null},
  reducers:{
    // your other reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default ProductSlice.reducer;