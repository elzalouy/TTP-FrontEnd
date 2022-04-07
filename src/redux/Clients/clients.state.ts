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
  selectedClient: Client[];
}
const clientState: ClientsInterface = {
  loading: null,
  clientsData: [],
  selectedClient: [],
};
export default clientState;
