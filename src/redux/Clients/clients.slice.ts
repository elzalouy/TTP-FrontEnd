import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllClients, creatClient } from "./clients.actions";
import clientState, { ClientsInterface } from "./clients.state";

const clientSlice: Slice<ClientsInterface> = createSlice({
  name: "clients",
  initialState: clientState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllClients.rejected, (state) => {
      state.loading = false;
      state.clientsData = [];
      state.selectedClient = null;
    });
    builder.addCase(getAllClients.pending, (state) => {
      state.loading = true;
      state.clientsData = [];
      state.selectedClient = null;
    });
    builder.addCase(
      getAllClients.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.clientsData = action.payload;
        state.selectedClient = action.payload;
      }
    );
    builder.addCase(creatClient.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(creatClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(creatClient.fulfilled, (state, action) => {
      state.loading = false;
      state.clientsData = [...state.clientsData, action.payload];
    });
  },
});
export const clientsActions = clientSlice.actions;
export default clientSlice.reducer;
