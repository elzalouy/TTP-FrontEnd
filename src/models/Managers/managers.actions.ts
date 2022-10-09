import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import { ToastError, ToastSuccess } from "src/coreUI/components/Typos/Alert";
import { generateID } from "../../helpers/IdGenerator";
import { removeAuthToken, setAuthToken } from "../../services/api";
import PMapi from "../../services/endpoints/PMs";
import { logout } from "../Auth";
import { fireCreatePMHook, fireEditPMHook } from "../Ui";
import { Manager } from "./managers.state";

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

export const getManagers = createAsyncThunk<any, any, any>(
  "PM/getManagers",
  async (_, { rejectWithValue, dispatch }) => {
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

export const createManager = createAsyncThunk<any, any, any>(
  "PM/createManager",
  async (args: any, { rejectWithValue }) => {
    try {
      let result: ApiResponse<Manager> | undefined;
      let manager: Manager = args.data;
      switch (manager.role) {
        case "PM":
          result = await PMapi.createPm(manager);
          break;
        case "OM":
          result = await PMapi.createOm(manager);
          break;
        case "SM":
          result = await PMapi.createSm(manager);
          break;
        default:
          break;
      }
      if (result && result.ok && result.data) {
        args.dispatch(fireCreatePMHook(""));
        return result.data;
      }
      ToastError(
        "Error happened while creating the project manager, please try again"
      );
    } catch (error: any) {
      ToastError("There was an error trying to create a PM from the server");
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
        ToastSuccess("Project Manager updated successfully");
        args.dispatch(fireEditPMHook(""));
        return PMs.data;
      }
      toast.error("Could not update PM , Please try again", {
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
        toastId: generateID(),
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
