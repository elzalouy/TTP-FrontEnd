import api from "../api";

export default {
  getHttpProjects: () => api.get("getProject"),
  getAllTasksStatistics: () => api.get("getAllTasksStatistics"),
  httpGetProjectById: (args: any) => api.get(`getProject${args}`),
  filterProjects: (args: any) => api.post("filterProjects", args),
  createProject: (args: any) => api.post("createProject", args),
  createTask: (args: any) => api.post("createTask", args),
  getTasks: (args: any) => api.get(`getTasks${args}`),
  filterTasks: (args: any) => api.post("filterTasks", args),
  deleteProjectTasks: (args: any) =>
    api.delete(`deleteTasksByProjectId`, {}, { data: args }),
  deleteProject: (args: any) => api.delete(`deleteProject`, {}, { data: args }),
  deleteTask: (args: any) => api.delete(`deleteTask`, {}, { data: args }),
  deleteTasks: (args: any) => api.delete(`deleteTasks`, {}, { data: args }),
  editProject: (args: any) => api.put("updateProject", args),
  moveTask: (args: any) => api.put("moveTask", args),
  editTask: (args: any) => api.post("updateTask", args),
  downloadAttachment: (args: any) => api.post(`downloadAttachment${args}`),
};
