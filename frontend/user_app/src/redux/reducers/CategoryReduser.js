import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../services/category.service";


const CategorySlice = createSlice({
  name:"categories",
  initialState: {data: [], loading: false, error: null},
  reducers:{
    // your other reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });




    
  },
});

export default CategorySlice.reducer;