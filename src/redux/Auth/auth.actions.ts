import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/auth";

export const signIn = createAsyncThunk<any, any, any>(
  "auth/signIn",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.signIn(args);
      if (result.data) {
        console.log({ user: result.data });
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<any, any, any>(
  "auth/logout",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await api.signOut(args);
      if (result.data) {
        return args;
      } else return [];
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
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk<any, any, any>(
  "auth/forgotPassword",
  async (_ , { rejectWithValue }) => {
    try {
      let result = await api.forgotPassword();
      if (result.data) {
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
