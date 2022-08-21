import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ToastSuccess } from "../../coreUI/components/Typos/Alert";
import { generateID } from "../../helpers/IdGenerator";
import { removeAuthToken } from "../../services/api";
import ClientsApi from "../../services/endpoints/clients";
import { logout } from "../Auth";

export const getAllClients = createAsyncThunk<any, any, any>(
  "clients/getAll",
  async (args: any, { rejectWithValue, dispatch }) => {
    try {
      let result = await ClientsApi.getClients();
      if (result?.status === 401 || result?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
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
  async (data: any, { rejectWithValue }) => {
    try {
      let formData: FormData = data;
      let result = {
        clientName: formData.get("clientName"),
        image: formData.get("image"),
        doneProject: 0,
        inProgressProject: 0,
        inProgressTask: 0,
      };
      console.log(result);
      ClientsApi.createClient(data);
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateClient = createAsyncThunk<any, any, any>(
  "client/updateClient",
  async (data: any, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("_id", data._id);
      formData.append("clientName", data.clientName);
      formData.append("image", data.image);
      formData.append("createdAt", data.createdAt);
      let client = await ClientsApi.updateClient(formData);
      if (client.ok && client.data) {
        toast.success("Client updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return client.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteClient = createAsyncThunk<any, any, any>(
  "client/deletClient",
  async (data: any, { rejectWithValue }) => {
    try {
      let client = await ClientsApi.deleteClient(data);
      if (client.ok && client.data) {
        toast.success("Client deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return data;
      }
      toast.error("Error hapenned while deleting the client", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error: any) {
      toast.error("There was an error from the server", {
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
