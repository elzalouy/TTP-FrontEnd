import api from "../api";

export default {
  getClients: () => api.get("getAllClients"),
  createClient: (data: any) => api.post("createClient", data),
};
