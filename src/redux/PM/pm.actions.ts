import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { generateID } from "../../helpers/IdGenerator";
import { removeAuthToken } from "../../services/api";
import PMapi from "../../services/endpoints/PMs";
import { fireCreatePMHook, fireEditPMHook } from "../Ui";

export const resendMail = createAsyncThunk<any, any, any>(
  "PM/resendMail",
  async (data: object, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.resendMail({
        id: data,
      });
      if (PMs.ok && PMs.data) {
        toast.success("New email sent successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getPMs = createAsyncThunk<any, any, any>(
  "PM/getPMs",
  async (_, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.getUsers();
      if (PMs?.status === 401 || PMs?.status === 403) {
        rejectWithValue("Un Authorized");
        removeAuthToken();
      }
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createPM = createAsyncThunk<any, any, any>(
  "PM/createPM",
  async (args: any, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.createUser(args.data);
      if (PMs.ok && PMs.data) {
        toast.success("Project Manager created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        args.dispatch(fireCreatePMHook(""));
        return PMs.data;
      }
      throw new Error(
        "Error happened while creating the project manager, please try again"
      );
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId:generateID(),
      });
      rejectWithValue(error);
    }
  }
);

export const updatePM = createAsyncThunk<any, any, any>(
  "PM/updatePM",
  async (args: any, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.updateUser(args.data);
      if (PMs.ok && PMs.data) {
        toast.success("Project Manager updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        args.dispatch(fireEditPMHook(""));
        return PMs.data;
      }
      throw new Error(PMs?.originalError?.message);
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId:generateID(),
      });
      rejectWithValue(error);
    }
  }
);

export const updatePMpassword = createAsyncThunk<any, any, any>(
  "PM/updatePMpassword",
  async (data: object, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.updatePassword(data);
      if (PMs.ok && PMs.data) {
        toast.success("Your password has been set successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return PMs.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resetPMpassword = createAsyncThunk<any, any, any>(
  "PM/resetPMpassword",
  async (data: object, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.resetPassword(data);
      if (PMs.ok && PMs.data) {
        toast.success("Your password has been set successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return PMs.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deletePM = createAsyncThunk<any, any, any>(
  "PM/deletePM",
  async (id: any, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.deleteUser(id);
      if (PMs.ok && PMs.data) {
        toast.success("Project Manager deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return PMs.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
