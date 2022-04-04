export interface Client {
  _id: string;
  clientName: string;
  projectsId: string[];
  createdAt: string;
  image: string;
}
export interface ClientsInterface {
  loading: boolean | null;
  clients: Client[];
  selectedClient: Client | null;
}
const clientState: ClientsInterface = {
  loading: null,
  clients: [],
  selectedClient: null,
};
export default clientState;
