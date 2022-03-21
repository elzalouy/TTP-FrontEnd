import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/techMembers";
export const getTechMembersByDeptId = createAsyncThunk<any, any, any>(
  "techMembers/getByDeptId",
  async (args, { rejectWithValue }) => {
    try {
      let members = await api.getHttpTechMembers(args);
      if (members.ok && members.data) return members.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getAllMembers = createAsyncThunk<any, any, any>(
  "techMembers/getAll",
  async (args, { rejectWithValue }) => {
    try {
      let members = await api.getHttpTechMembers({});
      if (members.ok && members.data) return members.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
