import api from "../api";

export default {
  getDepartments: () => api.get("getDeps"),
};
