import { createAsyncThunk } from "@reduxjs/toolkit";
import DepartmentsApi from "../../services/endpoints/departments";
import { toast } from "react-toastify";
import {
  fireCreateDepartmentHook,
  fireDeleteDepartmentHook,
  fireUpdateDepartmentHook,
} from "../Ui";
import { myReducer } from "../store";
import { removeAuthToken } from "../../services/api";
import { logout } from "../Auth";
import { ApiResponse } from "apisauce";

export const getAllDepartments = createAsyncThunk<any, any, any>(
  "departments/getAll",
  async (args: any, { rejectWithValue, dispatch }) => {
    try {
      let departments = await DepartmentsApi.getDepartments();
      if (departments?.status === 401 || departments?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
      }
      if (departments.ok && departments.data) return departments.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createDepartment = createAsyncThunk<any, any, any>(
  "departments/createDepartment",
  async (args: any, { rejectWithValue }) => {
    try {
      let department: ApiResponse<any> = await DepartmentsApi.createDepartment(
        args.data
      );
      console.log(args.data);
      if (department.ok && department.data) {
        args.setNames([]);
        args.setData("");
        args.setShow("none");
        args.dispatch(fireCreateDepartmentHook(""));
        toast.success("Department created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(department.data);
        return department.data;
      }
      toast.error(department.data.message);
      return rejectWithValue(department.data?.message);
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return department.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteDepartment = createAsyncThunk<any, any, any>(
  "departments/deleteDepartment",
  async (args: any, { rejectWithValue }) => {
    try {
      let department = await DepartmentsApi.deleteDepartment(args?.data);
      if (department.ok && department.data) {
        args?.dispatch(fireDeleteDepartmentHook(""));
        toast.success("Department deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return { ...args.data };
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
