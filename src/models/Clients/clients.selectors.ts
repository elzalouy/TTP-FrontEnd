import { RootState } from "../store";
import _ from "lodash";

export const clientsDataSelector = (state: RootState) =>
  state?.clients?.clientsData;

export const selectClient = (state: RootState) =>
  state?.clients?.selectedClient;

export const selectClientsNames = (state: RootState) => {
  let names = _.flatMap(state?.clients?.clientsData, (item) => {
    return { clientId: item._id, clientName: item.clientName };
  });
  return names;
};

export const selectClientOptions = (state: RootState) => {
  if (state.clients.clientsData.length > 0) {
    let options = state.clients.clientsData.map((item) => {
      return {
        id: item._id,
        value: item._id,
        text: item.clientName,
      };
    });
    return options;
  } else {
    return [];
  }
};

export const selectLoadingClient = (state: RootState) =>
  state?.clients?.loading;

export const selectEditClient = (state: RootState) => state?.clients.editClient;
