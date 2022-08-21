export interface Client {
  _id: string;
  clientName: string;
  doneProject: string[];
  inProgressProject: any;
  inProgressTask: any;
  createdAt: string;
  image: string | File;
}
export interface UpdateClientInterface {
  _id: string;
  clientName: string;
  createdAt: string;
  image: string;
}
export interface ClientsInterface {
  loading: boolean | null;
  clientsData: Client[];
  selectedClient: Client[];
  editClient: UpdateClientInterface;
}
const clientState: ClientsInterface = {
  loading: null,
  clientsData: [],
  selectedClient: [],
  editClient: {
    _id: "",
    clientName: "",
    createdAt: "",
    image: "",
  },
};
export default clientState;
