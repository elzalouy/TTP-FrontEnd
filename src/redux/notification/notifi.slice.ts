import { AnyAction, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllNotifi, updateNotifi } from "./notifi.actions";
import NotifiState, { Notifis } from "./notifi.state";
import moment from "moment";

const notifiSlice: Slice<Notifis> = createSlice({
  name: "clients",
  initialState: NotifiState,
  reducers: {
    onSort: (state = NotifiState, { payload }: AnyAction) => {},
    onSearch: (state = NotifiState, { payload }: AnyAction) => {},
    updateCounter: (state = NotifiState, { payload }: AnyAction) => {
      state.counter = state.counter + 1;
      state.notifi = [payload, ...state.notifi];
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
export const notifiAction = notifiSlice.actions;
export default notifiSlice.reducer;
