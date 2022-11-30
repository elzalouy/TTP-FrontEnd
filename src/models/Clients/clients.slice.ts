import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  getAllClients,
  creatClient,
  updateClient,
  deleteClient,
} from "./clients.actions";
import clientState, { Client, ClientsInterface } from "./clients.state";
import moment from "moment";
import _ from "lodash";

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
      let clients = state.clientsData.filter((item) =>
        item.clientName.match(new RegExp(payload, "i"))
      );
      state.filteredClients = clients;
    },
    setEditClient: (state = clientState, { payload }: PayloadAction<any>) => {
      state.editClient = payload;
    },

    createClient: (state = clientState, action: PayloadAction<any>) => {
      let index = state.clientsData.findIndex(
        (item) => item.clientName === action.payload.clientName
      );
      if (index >= 0) {
        let client = { ...state.clientsData[index] };
        client._id = action.payload._id;
        client.clientName = action.payload.clientName;
        client.doneProject = action.payload.doneProject;
        client.inProgressProject = action.payload.inProgressProject;
        client.inProgressTask = action.payload.inProgressTask;
        state.clientsData[index] = client;
      }
      state.filteredClients = state.clientsData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClients.rejected, (state) => {
      state.loading = false;
      state.clientsData = [];
      state.filteredClients = [];
    });
    builder.addCase(getAllClients.pending, (state) => {
      state.loading = true;
      state.clientsData = [];
      state.filteredClients = [];
    });
    builder.addCase(
      getAllClients.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.clientsData = action.payload;
        state.filteredClients = action.payload;
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
      state.clientsData = _.uniqBy(
        [...state.clientsData, action.payload],
        (item: Client) => item._id
      );
      state.filteredClients = _.uniqBy(
        [...state.clientsData, action.payload],
        (item: Client) => item._id
      );
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
      state.filteredClients = clientData;
    });
    builder.addCase(deleteClient.rejected, (state) => {
      state.deleteClientLoading = false;
    });
    builder.addCase(deleteClient.pending, (state) => {
      state.deleteClientLoading = true;
    });
    builder.addCase(deleteClient.fulfilled, (state, { payload }) => {
      state.deleteClientLoading = false;
      let clientData = state.clientsData;
      let clients = clientData.filter((item) => item._id !== payload?.id);
      state.clientsData = clients;
      //Updating selected client list with latest deleted data
      state.filteredClients = clients;
    });
  },
});
export const clientsActions = clientSlice.actions;
export default clientSlice.reducer;
