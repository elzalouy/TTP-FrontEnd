import api from "../api";

export default {
  getClients: () => api.get("getAllClients"),
  createClient: (data: any) => api.post("createClient", data),
  updateClient: (data: any) => api.put("updateClient", data),
  deleteClient: (data: { id: string }) => api.delete("deleteClient", data),
};
