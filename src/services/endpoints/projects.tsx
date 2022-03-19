import api from "../api";

export default {
  getHttpProjects: () => api.get("getProject"),
  createProject: (args: any) => api.post("createProject", args),
  createTask: (args: any) => api.post("createTask", args),
};
