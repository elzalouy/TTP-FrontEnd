import { createSlice, Slice } from "@reduxjs/toolkit";
import { getPMs ,createPM,updatePM,deletePM, updatePMpassword} from "./pm.actions";
import initialState, { ProjectManagersInterface } from "./pm.state";
const PMSlice: Slice<ProjectManagersInterface> = createSlice({
  name: "PM",
  initialState: initialState,
  reducers: {

  },
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
    builder.addCase(createPM.rejected, (state) => {
      state.loading = false;
      state.PMs = [];
    });
    builder.addCase(createPM.pending, (state) => {
      state.loading = true;
      state.PMs = [];
    });
    builder.addCase(createPM.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = [...state.PMs,action.payload];
    });
    builder.addCase(deletePM.rejected, (state) => {
      state.loading = false;
      state.PMs = [];
    });
    builder.addCase(deletePM.pending, (state) => {
      state.loading = true;
      state.PMs = [];
    });
    builder.addCase(deletePM.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = [...state.PMs,action.payload];
    });
    builder.addCase(updatePM.rejected, (state) => {
      state.loading = false;
      state.PMs = [];
    });
    builder.addCase(updatePM.pending, (state) => {
      state.loading = true;
      state.PMs = [];
    });
    builder.addCase(updatePM.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = [...state.PMs,action.payload];
    });
    builder.addCase(updatePMpassword.rejected, (state) => {
      state.loading = false;
      state.PMs = [];
    });
    builder.addCase(updatePMpassword.pending, (state) => {
      state.loading = true;
      state.PMs = [];
    });
    builder.addCase(updatePMpassword.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = [...state.PMs,action.payload];
    });
  },
});
export const PMsActions = PMSlice.actions;
export default PMSlice.reducer;
