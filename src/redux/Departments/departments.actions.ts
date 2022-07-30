import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/departments";
import { toast } from "react-toastify";
import { fireDeleteDepartmentHook, fireUpdateDepartmentHook } from "../Ui";
import { logout } from "../Auth";
import { ApiResponse } from "apisauce";
import {
  ToastError,
  ToastSuccess,
} from "../../coreUI/usable-component/Typos/Alert";

export const getAllDepartments = createAsyncThunk<any, any, any>(
  "departments/getAll",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let departments = await api.getDepartments();
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
      let department: ApiResponse<any> = await api.createDepartment(args.data);
      if (department.ok) {
        ToastSuccess("Department created successfully");
        return department.data;
      }
      ToastError(department.data.message);
      return rejectWithValue(department.data?.message);
    } catch (error: any) {
      ToastError("There was an error while creating the Department");
      rejectWithValue(error);
    }
  }
);

export const updateDepartment = createAsyncThunk<any, any, any>(
  "departments/updateDepartment",
  async (args: any, { rejectWithValue }) => {
    try {
      let department = await api.updateDepartment(args.data);
      if (department.ok && department.data) {
        // args.dispatch(fireUpdateDepartmentHook(""));
        ToastSuccess("Department updated successfully");
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
      let department = await api.deleteDepartment(args?.data);
      if (department.ok && department.data) {
        // args?.dispatch(fireDeleteDepartmentHook(""));
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
