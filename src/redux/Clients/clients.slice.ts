import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getAllClients } from "./clients.actions";
import clientState, { ClientsInterface } from "./clients.state";

const clientSlice: Slice<ClientsInterface> = createSlice({
  name: "clients",
  initialState: clientState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllClients.rejected, (state) => {
      state.loading = false;
      state.clients = [];
      state.selectedClient = null;
    });
    builder.addCase(getAllClients.pending, (state) => {
      state.loading = true;
      state.clients = [];
      state.selectedClient = null;
    });
    builder.addCase(
      getAllClients.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.clients = action.payload;
        state.selectedClient = action.payload;
      }
    );
  },
});
export const clientsActions = clientSlice.actions;
export default clientSlice.reducer;