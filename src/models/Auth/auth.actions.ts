import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { ToastError, ToastSuccess } from "src/coreUI/components/Typos/Alert";
import { removeAuthToken } from "../../services/api";
import api from "../../services/endpoints/auth";
import apiPM from "../../services/endpoints/PMs";

export const signIn = createAsyncThunk<any, any, any>(
  "auth/signIn",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.signIn(args?.data);
      if (result.ok) {
        localStorage.setItem("token", result.data.token);
        args.history.push("/Overview");
        ToastSuccess("Login successful");
        return result.data;
      }
      ToastError("Invalid Email Address or Password");
      return rejectWithValue(result.data);
    } catch (error: any) {
      ToastError("There was an error logging in");
      rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk<any, any, any>(
  "auth/getUserInfo",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let result = await apiPM.getUser(args);
      if (result?.status === 401 || result?.status === 403) {
        rejectWithValue("Un Authorized");
        return dispatch(logout(true));
      }
      if (result.ok === true) {
        return result.data;
      }
      localStorage.removeItem("token");
      return rejectWithValue(result.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<any, any, any>(
  "auth/logout",
  async (args, { rejectWithValue }) => {
    try {
      removeAuthToken();

      return true;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const newPassword = createAsyncThunk<any, any, any>(
  "auth/newPassword",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.newPasword(args);
      if (result.ok === true) {
        ToastSuccess("New password set successfully");
        return result.data;
      } else return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk<any, any, any>(
  "auth/forgotPassword",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.forgotPassword(args.data);
      if (result.ok === true) {
        ToastSuccess("An Email has been set to reset your password");
        args.history("/login");
        return result.data;
      } else {
        ToastError("Invalid Email Address");
        return result.data;
      }
    } catch (error: any) {
      ToastError("An error was encountered , Please try again later");
      rejectWithValue(error);
    }
  }
);
