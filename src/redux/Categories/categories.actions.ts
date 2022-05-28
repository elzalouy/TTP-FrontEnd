import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/categories";
import { toast } from "react-toastify";
import { removeAuthToken } from "../../services/api";
import { generateID } from "../../helpers/IdGenerator";

export const getAllCategories = createAsyncThunk<any, any, any>(
  "category/getAll",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.getCategories();
      if (result?.status === 401 || result?.status === 403) {
        rejectWithValue("Un Authorized");
        removeAuthToken();
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
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.createCategory(args);
      if (result.data) {
        toast.success("Category created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId:generateID(),
        });
        return args;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk<any, any, any>(
  "category/updateCategory",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.updateCategory(args);
      if (result.data) {
        toast.success("Category updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId:generateID(),
        });
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
