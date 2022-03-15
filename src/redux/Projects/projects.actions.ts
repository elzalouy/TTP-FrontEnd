import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/projects";
export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  () => {}
);
export const createProject = createAsyncThunk<any, any, any>(
  "projects/create",
  async (args, { rejectWithValue }) => {
    try {
      let result = await api.createProjects(args);
      if (result.ok && result.data) return { data: result.data };
      else return null;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
