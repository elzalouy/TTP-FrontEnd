import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../services/endpoints/auth";
import apiPM from "../../services/endpoints/PMs";

export const signIn = createAsyncThunk<any, any, any>(
  "auth/signIn",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.signIn(args?.data);
      if (result.ok) {
        args.history.push("/Overview");
        //This return below returns the error message and status for displaying on login UI
        return result.data;
      }
      return result.data;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk<any, any, any>(
  "auth/getUserInfo",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await apiPM.getUser(args);
      if (result.ok === true) {
        return result.data;
      }
      localStorage.removeItem("token");
      throw "Error happened";
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<any, any, any>(
  "auth/logout",
  async (args, { rejectWithValue }) => {
    try {
      let result = await api.signOut();
      localStorage.removeItem("token");
      if (result.ok === true) {
        return result.data;
      } else return result.data;
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
      let result = await api.forgotPassword(args);
      if (result.ok === true) {
        return result.data;
      } else return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
