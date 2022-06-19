import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import { generateID } from "../../helpers/IdGenerator";
import { setAuthToken } from "../../services/api";
import api from "../../services/endpoints/auth";
import apiPM from "../../services/endpoints/PMs";

export const signIn = createAsyncThunk<any, any, any>(
  "auth/signIn",
  async (args: any, { rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.signIn(args?.data);
      if (result.ok) {
        args.history.push("/Overview");
        localStorage.setItem("token", result?.data?.token);
        localStorage.setItem("id", result?.data?._id);
        //This return below returns the error message and status for displaying on login UI
        return result?.data;
      }
      return result.data;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "signin",
      });
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
      if (result.ok === true) {
        await localStorage.removeItem("token");
        await localStorage.removeItem("id");
        if(args){
          return true
        }else {
          return false
        }
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
        setAuthToken(args.id);
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
        toast.success("An Email has been set to reset your password", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: generateID(),
        });
        return result.data;
      } else {
        toast.error("Invalid Email Address", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: generateID(),
        });
        return result.data
      };
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
      rejectWithValue(error);
    }
  }
);
