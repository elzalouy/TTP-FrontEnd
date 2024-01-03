import _ from "lodash";
import { RootState } from "../store";

export const selectAllCategories = (state: RootState) =>
  state?.categories?.categories;

export const selectCategoriesDialogOptions = (state: RootState) => {
  let options = state.categories.categories.map((item) => {
    return {
      id: item._id ? item._id : "",
      label: item._id ? item.category : "",
    };
  });
  return options;
};
export const selectCategoriesOptions = (state: RootState) => {
  let options = state.categories.categories.map((item) => {
    return {
      id: item._id ? item._id : "",
      value: item._id ? item._id : "",
      text: item.category,
    };
  });
  return options.length > 0 ? options : [];
};

export const selectSelectedCategory = (state: RootState) =>
  state?.categories?.selectedCategory;

export const selectSubCategories = (state: RootState) =>
  _.flattenDeep(
    state?.categories?.categories?.map((item) => item.subCategoriesId)
  );

export const selectCatLoading = (state: RootState) =>
  state?.categories?.loading;
