import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/categories";
import { toast } from "react-toastify";
import { generateID } from "../../helpers/IdGenerator";
import { logout } from "../Auth";
import { fireCreateCategoryHook, fireDeleteCategoryHook } from "../Ui";
import { ToastSuccess } from "src/coreUI/components/Typos/Alert";

export const getAllCategories = createAsyncThunk<any, any, any>(
  "category/getAll",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let result = await api.getCategories();
      if (result?.status === 401 || result?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
      }
      if (result.data && result.ok) {
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk<any, any, any>(
  "category/createCategory",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let result = await api.createCategory(args.data);
      if (result?.status === 401 || result?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (result.data) {
        args.dispatch(fireCreateCategoryHook(""));
        ToastSuccess("Category created successfully");
        return args;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk<any, any, any>(
  "category/updateCategory",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let result = await api.updateCategory(args);
      if (result?.status === 401 || result?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (result.data) {
        ToastSuccess("Category updated successfully");
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk<any, any, any>(
  "category/deleteCategory",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let result = await api.updateCategory(args.data);
      if (result?.status === 401 || result?.status === 403) {
        rejectWithValue("Un Authorized");
        return dispatch(logout(true));
      }
      if (result.data) {
        args.dispatch(fireDeleteCategoryHook(""));
        ToastSuccess("Category deleted successfully");
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
