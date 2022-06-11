import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories.actions";
import initialState, { CategoriesInterface, Category } from "./categories.state";

const CategoriesSlice: Slice<CategoriesInterface> = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    onSearch: (state, { payload }) => {
      let categories = state.chosenCategories;
      if (payload === "") {
        state.categories = state.chosenCategories;
      } else {
        categories = categories.filter((category) =>
          category.category.match(new RegExp(payload, "gi"))
        );
        state.categories = categories;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.loading = false;
      state.categories = [];
      state.chosenCategories = [];
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.filter((item:Category)=>!item.isDeleted);
      state.chosenCategories = action.payload.filter((item:Category)=>!item.isDeleted);;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = [...state.categories, payload];
      state.chosenCategories = [...state.chosenCategories, payload];
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      let targetIndex = state.categories
        .map((item: any) => item._id)
        .indexOf(payload._id);
      state.categories.splice(targetIndex, 1, payload);
      state.chosenCategories.splice(targetIndex, 1, payload);
      
      state.loading = false;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.categories = [...state.categories].filter((cat) => {
        return cat._id !== payload._id
      });
      state.chosenCategories = [...state.chosenCategories].filter((cat) => {
        return cat._id !== payload._id
      });
      state.loading = false;
    });
  },
});
export const categoriesActions = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
