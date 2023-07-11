import api from "../../services/endpoints/departments";
import { logout } from "../Auth";
import { ApiResponse } from "apisauce";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fireDeleteDepartmentHook,
  fireUpdateDepartmentHook,
  toggleEditDepartment,
} from "../Ui";
import { ToastError, ToastSuccess } from "../../coreUI/components/Typos/Alert";
import { IDepartmentState } from "src/types/models/Departments";

export const getAllDepartments = createAsyncThunk<any, any, any>(
  "departments/getAll",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let departments = await api.getDepartments();
      if (departments.ok && departments.data) return departments.data;
      if (departments?.status === 401 || departments?.status === 403) {
        rejectWithValue("Un Authorized");
        return dispatch(logout(true));
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createDepartment = createAsyncThunk<any, any, any>(
  "departments/createDepartment",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let department: ApiResponse<any> = await api.createDepartment(args.data);
      if (department?.status === 401 || department?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (department.ok) {
        ToastSuccess("Department created successfully");
        args.onInitState();
        args.reset();
        return department.data;
      }
      ToastError(department.data);
      args.onSetLoading(false);
      return rejectWithValue(department.data);
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);

export const updateDepartment = createAsyncThunk<any, any, any>(
  "departments/updateDepartment",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let department: ApiResponse<any> = await api.updateDepartment(
        args.id,
        args.data
      );
      if (department?.status === 401 || department?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (department.ok) {
        args.dispatch(fireUpdateDepartmentHook(""));
        args.dispatch(toggleEditDepartment("none"));
        args.onInitState();
        ToastSuccess("Department updated successfully");
        return department.data;
      }
      args.stopLoading();
      ToastError(department.data);
      return rejectWithValue(department.data);
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteDepartment = createAsyncThunk<any, any, any>(
  "departments/deleteDepartment",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let department: ApiResponse<any> = await api.deleteDepartment(args?.id);
      if (department?.status === 401 || department?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (department.ok) {
        ToastSuccess("Department deleted successfully");
        args.setShow("none");
        args.dispatch(fireDeleteDepartmentHook(""));
        return department.data._id;
      }
      ToastError(department.data);
      return rejectWithValue(department.data);
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);

export const updateDepartmentsPriority = createAsyncThunk<any, any, any>(
  "departments/updateDepartments",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let response: ApiResponse<IDepartmentState[]> =
        await api.updateDepartmentsPriority(args);
      if (response.ok) return response.data;
      else rejectWithValue(response);
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);
