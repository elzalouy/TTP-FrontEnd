import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { generateID } from "../../helpers/IdGenerator";
import { removeAuthToken, setAuthToken } from "../../services/api";
import PMapi from "../../services/endpoints/PMs";
import { logout } from "../Auth";
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
  async (_, { rejectWithValue ,dispatch}) => {
    try {
      let PMs = await PMapi.getUsers();
      if (PMs?.status === 401 || PMs?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
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
      console.log(PMs);
      if (PMs.ok && PMs.data) {
        args.dispatch(fireCreatePMHook(""));
        return PMs.data;
      }
      toast.error(
        "Error happened while creating the project manager, please try again",{
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error: any) {
      toast.error("There was an error trying to create a PM from the server", {
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
      toast.error(PMs?.originalError?.message,{
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error: any) {
      toast.error("There was an error from the server while updating the PM", {
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
  async (args: any, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.resetPassword(args.data);
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
