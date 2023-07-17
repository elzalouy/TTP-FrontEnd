import api from "../api";

const departmentEndpoints = {
  getDepartments: () => api.get("getDeps"),
  createDepartment: (data: any) => api.post("createDep", data),
  deleteDepartment: (id: string) => api.delete(`deleteDep/${id}`),
  updateDepartment: (id: string, data: any) => api.put(`updateDep/${id}`, data),
  updateDepartmentsPriority: (ids: string[]): any =>
    api.put(`updateDepsPriority/`, { ids: ids }),
};
export default departmentEndpoints;
