import api from "../api";

export default {
  getDepartments: () => api.get("getDeps"),
  createDepartment: (data: any) => api.post("createDep", data),
  deleteDepartment: (id: string) => api.delete("deleteDep"),
  updateDepartment: (data: any) => api.put("updateDep", data),
};
