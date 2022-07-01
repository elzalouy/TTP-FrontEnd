import { AnyAction, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllNotifi, updateNotifi } from "./notifi.actions";
import NotifiState, { Notifis } from "./notifi.state";
import _ from "lodash";
import { removeDuplicatesFromArrayOfObjectsUsingOneProperty } from "../../helpers/generalUtils";
import { stat } from "fs";

const notifiSlice: Slice<Notifis> = createSlice({
  name: "notifications",
  initialState: NotifiState,
  reducers: {
    onSort: (state = NotifiState, { payload }: AnyAction) => { },
    onSearch: (state = NotifiState, { payload }: AnyAction) => { },
    updateCounter: (state = NotifiState, { payload }: AnyAction) => {
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
        let counter = action.payload.data.filter((item: any) =>
          action.payload.role === "OM"
            ? !item.adminViewed
            : !item.projectManagerViewed
        );
        state.loading = false;
        let filteredPayload = removeDuplicatesFromArrayOfObjectsUsingOneProperty([...state.notifi, ...action.payload.data], state.notifi);
        if (filteredPayload.length === state.notifi.length) {
          //The state length being same as filtered payload length indicates the filtered data is the same result as before
          state.hideLoading = true;
        }
        state.notifi = [...filteredPayload];
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
