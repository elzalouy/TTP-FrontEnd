import { createAsyncThunk } from "@reduxjs/toolkit";
import DepartmentsApi from "../../services/endpoints/departments";
import { toast } from "react-toastify";

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

export const createDepartment = createAsyncThunk<any, any, any>(
  "departments/createDepartment",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log({ data });
      let department = await DepartmentsApi.createDepartment(data);
      console.log({ department });
      if (department.ok && department.data) {
        toast("Department created successfully");
        return { ...data, teamsId: data.teams };
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
