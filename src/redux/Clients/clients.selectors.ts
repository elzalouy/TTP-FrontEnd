import { RootState } from "../store";
import _ from "lodash";
export const selectClients = (state: RootState) => state.clients.clients;
export const selectClient = (state: RootState) => state.clients.selectedClient;
export const selectClientsNames = (state: RootState) => {
  let names = _.flatMap(state.clients.clients, (item) => {
    return { clientId: item._id, clientName: item.clientName };
  });
  return names;
};
