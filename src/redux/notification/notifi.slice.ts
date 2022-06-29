import { AnyAction, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllNotifi, updateNotifi } from "./notifi.actions";
import NotifiState, { Notifis } from "./notifi.state";
import moment from "moment";
import { stat } from "fs";
import _ from "lodash";

const notifiSlice: Slice<Notifis> = createSlice({
  name: "notifications",
  initialState: NotifiState,
  reducers: {
    onSort: (state = NotifiState, { payload }: AnyAction) => {},
    onSearch: (state = NotifiState, { payload }: AnyAction) => {},
    updateCounter: (state = NotifiState, { payload }: AnyAction) => {
      console.log(payload);
      let notifiaction = state.notifi.findIndex(
        (item) => item._id === payload?._id
      );
      if (notifiaction <= 0) {
        state.counter = state.counter + 1;
        state.notifi = [payload, ...state.notifi];
      }
    },
    setHideLoadingState: (state = NotifiState, { payload }: AnyAction) => {
      state.hideLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifi.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllNotifi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllNotifi.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.data.length === 0) {
          state.hideLoading = true;
        }
        let counter = action.payload.data.filter((item: any) =>
          action.payload.role === "OM"
            ? !item.adminViewed
            : !item.projectManagerViewed
        );
        state.loading = false;
        state.notifi = [...state.notifi, ...action.payload.data];
        state.counter = counter.length;
      }
    );
    builder.addCase(updateNotifi.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateNotifi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateNotifi.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.counter = 0;
      }
    );
  },
});
export const { onSort, onSearch, updateCounter, setHideLoadingState } =
  notifiSlice.actions;
export default notifiSlice.reducer;
