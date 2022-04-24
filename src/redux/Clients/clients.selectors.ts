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
export const selectEditClient = (state: RootState) => state?.clients.editClient;
