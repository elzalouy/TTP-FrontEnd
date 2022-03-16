import api from "../api";

export default {
  getPMs: () => api.get("getUsers?role=project manager"),
};
