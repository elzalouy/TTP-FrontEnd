import api from "../api";

export default {
  getHttpProjects: () => api.get("getProject"),
  httpGetProjectById: (args: any) => api.get(`getProject${args}`),
  filterProjects: (args: any) => api.post("filterProjects", args),
  createProject: (args: any) => api.post("createProject", args),
  createTask: (args: any) => api.post("createTask", args),
  getTasks: (args: any) => api.get(`getTasks${args}`),
  filterTasks: (args: any) => api.post("filterTasks", args),
};
