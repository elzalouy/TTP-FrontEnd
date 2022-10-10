import { AnyAction, createSlice, Slice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ToastSuccess, ToastWarning } from "src/coreUI/components/Typos/Alert";
import {
  getManagers,
  createManager,
  updateManager,
  deletePM,
  updateManagerpassword,
  resetPMpassword,
  resendMail,
} from "./managers.actions";
import initialState, { ManagersInterface } from "./managers.state";

const PMSlice: Slice<ManagersInterface> = createSlice({
  name: "PM",
  initialState: initialState,
  reducers: {
    getAllPM: (state = initialState) => {
      let AllPMs = state.managers.filter((pm) => {
        return pm.role === "PM";
      });
      state.managers = AllPMs;
    },
    setId: (state = initialState, { payload }: AnyAction) => {
      state.current_ID = payload._id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getManagers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getManagers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getManagers.fulfilled, (state, action) => {
      state.loading = false;
      state.managers = action.payload;
    });
    builder.addCase(createManager.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createManager.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createManager.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status !== 400) {
        ToastSuccess("Project Manager created successfully");
        state.managers = [...state.managers, action.payload];
      } else {
        ToastWarning(
          "The Email address is already in use, Please try a different Email address"
        );
      }
    });
    builder.addCase(deletePM.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePM.fulfilled, (state, action) => {
      state.loading = false;
      state.managers = state.managers.filter(
        (pm) => pm._id !== state.current_ID
      );
    });
    builder.addCase(updateManager.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateManager.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateManager.fulfilled, (state, action) => {
      state.loading = false;
      let oldData = state.managers.filter(
        (pm) => pm._id !== action.payload._id
      );
      state.managers = [...oldData, action.payload];
    });
    builder.addCase(updateManagerpassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateManagerpassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateManagerpassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.msg && payload.status) {
        state.Payload = {
          msg: payload.msg,
          status: payload.status,
        };
      } else {
        state.managers = payload;
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
          msg: payload.msg,
          status: payload.status,
        };
      } else {
        state.managers = [...payload];
      }
    });
    builder.addCase(resendMail.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(resendMail.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(resendMail.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
  },
});
export const PMsActions = PMSlice.actions;
export default PMSlice.reducer;
