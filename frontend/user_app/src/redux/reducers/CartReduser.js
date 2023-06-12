import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCart } from "../services/cart.service";

const CartSlice = createSlice({
  name:"carts",
  initialState: {data: [], loading: false, error: null},
  reducers:{
    // your other reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });




    
  },
});

export default CartSlice.reducer;