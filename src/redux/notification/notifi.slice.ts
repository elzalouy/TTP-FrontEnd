import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllNotifi, updateNotifi } from "./notifi.actions";
import NotifiState, { Notifis } from "./notifi.state";
import moment from "moment";

const clientSlice: Slice<Notifis> = createSlice({
  name: "clients",
  initialState: NotifiState,
  reducers: {
    onSort: (state, { payload }) => {},
    onSearch: (state, { payload }) => {},
    updateCounter:(state,{payload}) => {
      state.counter = payload
    }
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
        state.loading = false;
        state.notifi = action.payload
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
      }
    );
  },
});
export const clientsActions = clientSlice.actions;
export default clientSlice.reducer;
