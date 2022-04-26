import { createSlice, Slice } from "@reduxjs/toolkit";
import { forgotPassword, newPassword, signIn } from "./auth.actions";
import initialState, { UserInterface } from "./auth.state";

const PMSlice: Slice<UserInterface> = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
     
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
      state.User = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.User = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.User = action.payload;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.User = action.payload
    });
    builder.addCase(newPassword.rejected, (state) => {
      state.loading = false;
      state.User = false;
    });
    builder.addCase(newPassword.pending, (state) => {
      state.loading = true;
      state.User = false;
    });
    builder.addCase(newPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.User = action.payload;
    });
  },
});
export const PMsActions = PMSlice.actions;
export default PMSlice.reducer;
