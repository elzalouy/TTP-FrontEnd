import { createAsyncThunk } from "@reduxjs/toolkit";
import DepartmentsApi from "../../services/endpoints/departments";
export const getAllDepartments = createAsyncThunk<any, any, any>(
  "departments/getALl",
  async (args: any, { rejectWithValue }) => {
    try {
      let departments = await DepartmentsApi.getDepartments();
      if (departments.ok && departments.data) return departments.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
