import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import NOtifiApi from "../../services/endpoints/notification";

export const getAllNotifi = createAsyncThunk<any, any, any>(
  "notifi/getAllNotifi",
  async (id:string, { rejectWithValue }) => {
    try {
      let result = await NOtifiApi.getNotifi(id);
      if (result.data) {
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateNotifi = createAsyncThunk<any, any, any>(
  "notifi/updateNotifi",
  async ({id,role}, { rejectWithValue }) => {
    try {
      let result = await NOtifiApi.updateNotifi({_id:id,role});
      if (result.data) {
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateCounter = createAsyncThunk<any, any, any>(
  "notifi/updateCounter",
  async ({ rejectWithValue }) => {
    try {

        return {count:1};
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

