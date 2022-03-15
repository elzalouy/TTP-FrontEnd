import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllCategories } from "./categories.actions";
import initialState, { CategoriesInterface } from "./categories.state";

const CategoriesSlice: Slice<CategoriesInterface> = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.categories = [];
      state.selectedCategory = null;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.loading = false;
      state.categories = [];
      state.selectedCategory = null;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.selectedCategory = action.payload[0];
    });
  },
});
export const categoriesActions = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
