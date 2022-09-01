import { RootState } from "../store";

export const selectAllCategories = (state: RootState) =>
  state?.categories?.categories;

export const selectCategoriesOptions = (state: RootState) => {
  if (state.categories.categories) {
    let options = state.categories.categories.map((item) => {
      return {
        id: item._id ? item._id : "",
        value: item._id ? item._id : "",
        text: item.category,
      };
    });
    return options;
  } else return [];
}

export const selectSelectedCategory = (state: RootState) =>
  state?.categories?.selectedCategory;

export const selectSubCategories = (state: RootState) => state?.categories?.categories?.map(item => item.subCategoriesId);

export const selectCatLoading = (state: RootState) => state?.categories?.loading;

