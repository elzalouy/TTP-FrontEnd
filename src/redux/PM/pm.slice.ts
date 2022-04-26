import { createSlice, Slice } from "@reduxjs/toolkit";
import { getPMs ,createPM,updatePM,deletePM, updatePMpassword} from "./pm.actions";
import initialState, { ProjectManagersInterface } from "./pm.state";

const PMSlice: Slice<ProjectManagersInterface> = createSlice({
  name: "PM",
  initialState: initialState,
  reducers: {
      getPM:(state,{payload})=>{
        
      },
      setId:(state,{payload})=>{
        state.current_ID = payload._id;
      }
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
    });
    builder.addCase(createPM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPM.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = [...state.PMs,action.payload];
    });
    builder.addCase(deletePM.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePM.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = state.PMs.filter((pm)=>pm._id!==state.current_ID);
    });
    builder.addCase(updatePM.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePM.fulfilled, (state, action) => {
      state.loading = false;
      console.log();
      let oldData = state.PMs.filter((pm)=>pm._id!==action.payload._id);
      state.PMs = [...oldData,action.payload];
    });
    builder.addCase(updatePMpassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePMpassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePMpassword.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = [...state.PMs,action.payload];
    });
  },
});
export const PMsActions = PMSlice.actions;
export default PMSlice.reducer;
