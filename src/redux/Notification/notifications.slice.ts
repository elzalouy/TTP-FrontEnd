import _ from "lodash";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  getNotifications,
  getUnNotified,
  updateNotified,
} from "./notifications.actions";
import NotificationState from "./notifications.state";
import { NotificationsState } from "../../interfaces/models/Notifications";

const notifiSlice: Slice<NotificationsState> = createSlice({
  name: "notifications",
  initialState: NotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getNotifications.fulfilled,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.current === state.current + 1) {
          state.notifications = [
            ...state.notifications,
            ...action.payload.notifications,
          ];
        } else if (action.payload.current === 0) {
          state.notifications = action.payload.notifications;
        }
        state.pages = action.payload.pages;
        state.limit = action.payload.limit;
        state.current = action.payload.current;
      }
    );
    builder.addCase(
      getNotifications.rejected,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      getNotifications.pending,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getUnNotified.fulfilled,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = false;
        state.unNotified = action.payload.NoOfUnNotified;
      }
    );
    builder.addCase(
      getUnNotified.rejected,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getUnNotified.pending,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      updateNotified.fulfilled,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = false;
        state.unNotified = action.payload.NoOfUnNotified;
      }
    );
    builder.addCase(
      updateNotified.rejected,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      updateNotified.pending,
      (state = NotificationState, action: PayloadAction<any>) => {
        state.loading = true;
      }
    );
  },
});
export default notifiSlice.reducer;
