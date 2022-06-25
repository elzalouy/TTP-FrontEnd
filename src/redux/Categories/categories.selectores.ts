import { RootState } from "../store";

export const selectAllCategories = (state: RootState) =>
  state?.categories?.categories;

export const selectSelectedCategory = (state: RootState) =>
  state?.categories?.selectedCategory;

export const selectSubCategories = (state: RootState) => state?.categories?.categories?.map(item => item.subCategoriesId);

export const selectCatLoading = (state: RootState) => state?.categories?.loading;

