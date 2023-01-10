import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ToastError, ToastSuccess } from "src/coreUI/components/Typos/Alert";
import { generateID } from "../../helpers/IdGenerator";
import ClientsApi from "../../services/endpoints/clients";
import { logout } from "../Auth";

export const getAllClients = createAsyncThunk<any, any, any>(
  "clients/getAll",
  async (args: any, { rejectWithValue, dispatch }) => {
    try {
      let result = await ClientsApi.getClients();
      if (result?.status === 401 || result?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (result.data) {
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const creatClient = createAsyncThunk<any, any, any>(
  "client/createClient",
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let formData: FormData = args.data;
      let response = await ClientsApi.createClient(formData);
      if (response?.status === 401 || response?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (response.ok) {
        args.onClearAndClose();
        return response.data;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateClient = createAsyncThunk<any, any, any>(
  "client/updateClient",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("_id", data._id);
      formData.append("clientName", data.clientName);
      formData.append("image", data.image);
      formData.append("createdAt", data.createdAt);
      let client = await ClientsApi.updateClient(formData);
      if (client?.status === 401 || client?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (client.ok && client.data) {
        ToastSuccess("Client updated successfully");
        return client.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteClient = createAsyncThunk<any, any, any>(
  "client/deletClient",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      let client = await ClientsApi.deleteClient(data);
      if (client?.status === 401 || client?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (client.ok && client.data) {
        ToastSuccess("Client deleted successfully");
        return data;
      }
      ToastError("Error hapenned while deleting the client");
    } catch (error: any) {
      ToastError("There was an error from the server");
      rejectWithValue(error);
    }
  }
);
