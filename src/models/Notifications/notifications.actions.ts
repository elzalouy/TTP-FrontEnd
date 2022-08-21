import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { ToastError } from "../../coreUI/components/Typos/Alert";
import api from "../../services/endpoints/notification";

/**
 * getNotifications
 *
 * A  function to get the user notifications with a pagination
 */
export const getNotifications = createAsyncThunk<any, any, any>(
  "notifications/getNotifications",
  async (data, { rejectWithValue }) => {
    try {
      let response: ApiResponse<any> = await api.httpGetNotifications(data);
      if (response.data && response.ok) {
        return response.data;
      }
      ToastError("Error hapenned while getting your notifications.");
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

/**
 * updateNotified
 *
 * A function to update notifications to the notified status with isNotified=true
 */
export const updateNotified = createAsyncThunk<any, any, any>(
  "notifications/updateNotified",
  async (data, { rejectWithValue }) => {
    try {
      let response: ApiResponse<any> = await api.httpUpdateNotified();
      if (response.ok && response.data) return response.data;
      ToastError(response.data);
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

/**
 * getNotified
 *
 * A function to update notifications to the notified status with isNotified=true
 */
export const getUnNotified = createAsyncThunk<any, any, any>(
  "notifications/getNotified",
  async (data, { rejectWithValue }) => {
    try {
      let response: ApiResponse<any> = await api.httpGetUnNotified();
      if (response.ok && response.data) return response.data;
      ToastError(response.data);
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
