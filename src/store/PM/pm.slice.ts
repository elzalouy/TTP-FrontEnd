import { createSlice, Slice } from "@reduxjs/toolkit";
import { getPMs } from "./pm.actions";
import initialState, { ProjectManagersInterface } from "./pm.state";
const PMSlice: Slice<ProjectManagersInterface> = createSlice({
  name: "PM",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPMs.rejected, (state) => {
      state.loading = false;
      state.PMs = [];
    });
    builder.addCase(getPMs.pending, (state) => {
      state.loading = true;
      state.PMs = [];
    });
    builder.addCase(getPMs.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = action.payload;
    });
  },
});
export const PMsActions = PMSlice.actions;
export default PMSlice.reducer;
