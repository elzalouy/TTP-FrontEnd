import { createSlice, Slice } from "@reduxjs/toolkit";
import { getPMs, createPM, updatePM, deletePM, updatePMpassword, resetPMpassword } from "./pm.actions";
import initialState, { ProjectManagersInterface } from "./pm.state";

const PMSlice: Slice<ProjectManagersInterface> = createSlice({
  name: "PM",
  initialState: initialState,
  reducers: {
    getAllPM: (state) => {
      let AllPMs = state.PMs.filter((pm)=>{
        return pm.role === "PM";
      });
      state.PMs = AllPMs;
    },
    setId: (state, { payload }) => {
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
      state.PMs = [...state.PMs, action.payload];
    });
    builder.addCase(deletePM.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePM.fulfilled, (state, action) => {
      state.loading = false;
      state.PMs = state.PMs.filter((pm) => pm._id !== state.current_ID);
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
      let oldData = state.PMs.filter((pm) => pm._id !== action.payload._id);
      state.PMs = [...oldData, action.payload];
    });
    builder.addCase(updatePMpassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePMpassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePMpassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.msg && payload.status) {
        state.Payload = {
          msg: payload.msg, status: payload.status
        }
      } else {
        state.PMs = payload;
      }
    });
    builder.addCase(resetPMpassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPMpassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPMpassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.msg && payload.status) {
        state.Payload = {
          msg: payload.msg, status: payload.status
        }
      } else {
        state.PMs = payload;
      }
    });
  },
});
export const PMsActions = PMSlice.actions;
export default PMSlice.reducer;
