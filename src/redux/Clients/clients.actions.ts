import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ClientsApi from "../../services/endpoints/clients";

export const getAllClients = createAsyncThunk<any, any, any>(
  "clients/getAll",
  async (args: any, { rejectWithValue }) => {
    try {
      let result = await ClientsApi.getClients();
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
      let client = await ClientsApi.createClient(data);
      if (client.ok && client.data) {
        toast.success("Client created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
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
          hideProgressBar: true,
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
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return data;
      }
      throw "Error hapenned while deleting the client";
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
