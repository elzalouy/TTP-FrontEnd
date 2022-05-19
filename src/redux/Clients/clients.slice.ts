import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  getAllClients,
  creatClient,
  updateClient,
  deleteClient,
} from "./clients.actions";
import clientState, { ClientsInterface } from "./clients.state";
import moment from "moment";

const clientSlice: Slice<ClientsInterface> = createSlice({
  name: "clients",
  initialState: clientState,
  reducers: {
    onSort: (state = clientState, { payload }: PayloadAction<any>) => {
      let clientData = state.clientsData;
      if (payload === "asc") {
        clientData.sort(
          (a: any, b: any) =>
            moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
        );
      } else if (payload === "des") {
        clientData.sort(
          (a: any, b: any) =>
            moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
        );
      }
      state.clientsData = clientData;
    },
    onSearch: (state = clientState, { payload }: PayloadAction<any>) => {
      let clientData = state.selectedClient;
      if (payload === "") {
        state.clientsData = state.selectedClient;
      } else {
        clientData = clientData.filter((client) =>
          client.clientName.match(new RegExp(payload, "gi"))
        );
        state.clientsData = clientData;
      }
    },
    setEditClient: (state = clientState, { payload }: PayloadAction<any>) => {
      state.editClient = payload;
    },
    createProjectHook: (
      state = clientState,
      { payload }: PayloadAction<any>
    ) => {
      let index = state.clientsData.findIndex((item) => item._id === payload);
      console.log(index);
      if (index) {
        let client = { ...state.clientsData[index] };
        client.inProgressProject = client.inProgressProject + 1;
        state.clientsData[index] = client;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClients.rejected, (state) => {
      state.loading = false;
      state.clientsData = [];
      state.selectedClient = [];
    });
    builder.addCase(getAllClients.pending, (state) => {
      state.loading = true;
      state.clientsData = [];
      state.selectedClient = [];
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
    builder.addCase(updateClient.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateClient.fulfilled, (state, { payload }) => {
      state.loading = false;
      let clientData = state.clientsData;
      let clientIndex = clientData
        .map((client) => client._id)
        .indexOf(payload._id);
      clientData.splice(clientIndex, 1, payload);
      state.clientsData = clientData;
    });
    builder.addCase(deleteClient.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteClient.fulfilled, (state, { payload }) => {
      state.loading = false;
      let clientData = state.clientsData;
      let clients = clientData.filter((item) => item._id !== payload?.id);
      state.clientsData = clients;
    });
  },
});
export const clientsActions = clientSlice.actions;
export default clientSlice.reducer;
