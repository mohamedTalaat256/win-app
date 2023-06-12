import { createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "../services/order.service";

const OrderSlice = createSlice({
  name:"orders",
  initialState: {data: [], loading: false, error: null},
  reducers:{
    // your other reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export default OrderSlice.reducer;