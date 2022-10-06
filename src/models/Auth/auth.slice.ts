import { createSlice, Slice } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "src/coreUI/components/Typos/Alert";
import { UserInterface } from "../../types/models/user";
import {
  forgotPassword,
  getUserInfo,
  logout,
  newPassword,
  signIn,
} from "./auth.actions";
import initialState from "./auth.state";

const AuthSlice: Slice<UserInterface> = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.authed = true;
      state.User = payload;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.authed = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.loading = false;
      state.User = null;
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.User = payload;
    });
    builder.addCase(newPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(newPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
  },
});
export const AuthAction = AuthSlice.actions;
export default AuthSlice.reducer;
