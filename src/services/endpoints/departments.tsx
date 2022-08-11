import api from "../api";

export default {
  getDepartments: () => api.get("getDeps"),
  createDepartment: (data: any) => api.post("createDep", data),
  deleteDepartment: (id: string) => api.delete(`deleteDep/${id}`),
  updateDepartment: (id: string, data: any) => api.put(`updateDep/${id}`, data),
};
