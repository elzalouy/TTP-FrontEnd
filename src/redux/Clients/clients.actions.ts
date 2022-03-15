import { createAsyncThunk } from "@reduxjs/toolkit";
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
