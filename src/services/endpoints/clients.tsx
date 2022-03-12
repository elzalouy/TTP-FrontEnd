import api from "../api";

export default {
  getClients: () => api.get("getAllClients"),
};
