import { createAsyncThunk } from "@reduxjs/toolkit";
import PMapi from "../../services/endpoints/PMs";
export const getPMs = createAsyncThunk<any, any, any>(
  "PM/getAll",
  async (args: any, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.getPMs();
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
