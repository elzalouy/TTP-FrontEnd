import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/categories";
export const getAllCategories = createAsyncThunk<any, any, any>(
  "categories/getAll",
  async (args: any, { rejectWithValue }) => {
    try {
      // let categories = await api.getCategories();
      return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
