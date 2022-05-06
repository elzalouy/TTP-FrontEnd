import { createSlice, Slice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  forgotPassword,
  getUserInfo,
  logout,
  newPassword,
  signIn,
} from "./auth.actions";
import initialState, { UserInterface } from "./auth.state";

const AuthSlice: Slice<UserInterface> = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
      state.authState = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.authState = false;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.msg && payload.status) {
        state.Payload = {
          msg: payload.msg,
          status: payload.status,
        };
        state.authState = false;
      } else {
        state.User = payload;
        state.authState = true;
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.msg && payload.status) {
        state.Payload = {
          msg: payload.msg,
          status: payload.status,
        };
      } else {
        state.User = payload;
        state.authState = true;
      }
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.authState = true;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.authState = true;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.User = initialState.User;
      state.authState = false;
      toast.success("Logout successful", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.User = payload;
      state.authState = true;
    });
    builder.addCase(newPassword.rejected, (state) => {
      state.loading = false;
      state.authState = false;
    });
    builder.addCase(newPassword.pending, (state) => {
      state.loading = true;
      state.authState = false;
    });
    builder.addCase(newPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.msg && payload.status) {
        state.Payload = {
          msg: payload.msg,
          status: payload.status,
        };
      } else {
        toast.success("New password set successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        state.User = payload;
        state.authState = payload.status === 200 ? true : false;
      }
    });
  },
});
export const AuthAction = AuthSlice.actions;
export default AuthSlice.reducer;
