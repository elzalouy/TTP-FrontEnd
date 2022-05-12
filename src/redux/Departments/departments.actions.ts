import { createAsyncThunk } from "@reduxjs/toolkit";
import DepartmentsApi from "../../services/endpoints/departments";
import { toast } from "react-toastify";
import { fireUpdateDepartmentHook } from "../Ui";

export const getAllDepartments = createAsyncThunk<any, any, any>(
  "departments/getAll",
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
      let department = await DepartmentsApi.createDepartment(data);
      if (department.ok && department.data) {
        toast.success("Department created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return department.data;
      }
      throw "Department not creacted, error hapenned";
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);

export const updateDepartment = createAsyncThunk<any, any, any>(
  "departments/updateDepartment",
  async (args: any, { rejectWithValue }) => {
    try {
      let department = await DepartmentsApi.updateDepartment(args.data);
      if (department.ok && department.data) {
        args.dispatch(fireUpdateDepartmentHook(""));
        toast.success("Department updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(department.data);
        return department.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteDepartment = createAsyncThunk<any, any, any>(
  "departments/deleteDepartment",
  async (data: any, { rejectWithValue }) => {
    try {
      let department = await DepartmentsApi.deleteDepartment(data);
      if (department.ok && department.data) {
        toast.success("Department deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return { ...data };
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
