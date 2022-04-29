import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/auth";
import apiPM from "../../services/endpoints/PMs"
import { User } from "./auth.state";

export const signIn = createAsyncThunk<any, any, any>(
  "auth/signIn",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.signIn(args);
      if (result.data) {
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk<any, any, any>(
  "auth/getUserInfo",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await apiPM.getUser(args);
      if (result.data) {
        return result.data;
      }
      localStorage.removeItem("token");
    } catch (error) {
      rejectWithValue(error)
    }
  }
);

export const logout = createAsyncThunk<any, any, any>(
  "auth/logout",
  async (args, { rejectWithValue }) => {
    try {
      let result = await api.signOut();
      localStorage.removeItem("token");
      if (result.data) {
        return;
      } else return {};
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
      if (result.data) {
        return result.data;
      } else return false;
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
      if (result.data) {
        return result.data;
      } else return {};
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
