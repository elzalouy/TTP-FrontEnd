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
        toast("Client created successfully");
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
      console.log({ data });
      let client = await ClientsApi.updateClient(data);
      console.log({ client });
      if (client.ok && client.data) {
        toast("Client updated successfully");
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
      console.log({ data });
      let client = await ClientsApi.deleteClient(data);
      console.log({ client });
      if (client.ok && client.data) {
        toast("Client deleted successfully");
        return data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
