import { createAsyncThunk } from "@reduxjs/toolkit";
import PMapi from "../../services/endpoints/PMs";



export const getPMs = createAsyncThunk<any, any, any>(
  "PM/getPMs",
  async (_, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.getUsers();
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createPM = createAsyncThunk<any, any, any>(
  "PM/createPM",
  async (data:object , { rejectWithValue }) => {
    try {
      let PMs = await PMapi.createUser(data);
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updatePM = createAsyncThunk<any, any, any>(
  "PM/updatePM",
  async (data: object, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.updateUser(data);
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updatePMpassword = createAsyncThunk<any, any, any>(
  "PM/updatePMpassword",
  async (data: object, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.updatePassword(data);
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resetPMpassword = createAsyncThunk<any, any, any>(
  "PM/resetPMpassword",
  async (data: object, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.resetPassword(data);
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deletePM = createAsyncThunk<any, any, any>(
  "PM/deletePM",
  async (id:any, { rejectWithValue }) => {
    try {
      let PMs = await PMapi.deleteUser(id);
      if (PMs.ok && PMs.data) return PMs.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
