export interface Client {
  _id: string;
  clientName: string;
  doneProject: string[];
  inProgressProject: string[];
  inProgressTask: string[];
  createdAt: string;
  image: string;
}
export interface ClientsInterface {
  loading: boolean | null;
  clientsData: Client[];
  selectedClient: Client | null;
}
const clientState: ClientsInterface = {
  loading: null,
  clientsData: [],
  selectedClient: null,
};
export default clientState;
