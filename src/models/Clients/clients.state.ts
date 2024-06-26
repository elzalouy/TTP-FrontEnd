export interface Client {
  _id: string;
  clientName: string;
  doneProject: string | number;
  inProgressProject: string | number;
  inProgressTask: string | number;
  createdAt: string;
  image: string | File;
}
export interface UpdateClientInterface {
  _id: string;
  clientName: string;
  createdAt: string;
  image: any;
}
export interface ClientsInterface {
  loading: boolean | null;
  clientsData: Client[];
  filteredClients: Client[];
  editClient: UpdateClientInterface;
  deleteClientLoading?: boolean;
}
const clientState: ClientsInterface = {
  loading: null,
  clientsData: [],
  filteredClients: [],
  deleteClientLoading: false,
  editClient: {
    _id: "",
    clientName: "",
    createdAt: "",
    image: "",
  },
};
export default clientState;
