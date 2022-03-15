import api from "../api";

export default {
  getHttpProjects: () => api.get("getProject"),
  createProjects: (args: any) => api.post("createProject", args),
};
