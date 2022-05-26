import { createAsyncThunk } from "@reduxjs/toolkit";
import DepartmentsApi from "../../services/endpoints/departments";
import { toast } from "react-toastify";
import { fireCreateDepartmentHook, fireUpdateDepartmentHook } from "../Ui";
import { myReducer } from "../store";
import { removeAuthToken } from "../../services/api";
export const getAllDepartments = createAsyncThunk<any, any, any>(
  "departments/getAll",
  async (args: any, { rejectWithValue }) => {
    try {
      let departments = await DepartmentsApi.getDepartments();
      if (departments?.status === 401 || departments?.status === 403) {
        rejectWithValue("Un Authorized");
        removeAuthToken();
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
      let department = await DepartmentsApi.createDepartment(args.data);
      if (department.ok && department.data) {
        args.dispatch(fireCreateDepartmentHook(""));
        toast.success("Department created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return department.data;
      }
      throw "Department not creacted, error hapenned";
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
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
          autoClose: 1500,
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
  async (data: any, { rejectWithValue }) => {
    try {
      let department = await DepartmentsApi.deleteDepartment(data);
      if (department.ok && department.data) {
        toast.success("Department deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
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
