import { RootState } from "../store";

export const selectAllCategories = (state: RootState) =>
  state.categories.categories;

export const selectSelectedCategory = (state: RootState) =>
  state.categories.selectedCategory;
