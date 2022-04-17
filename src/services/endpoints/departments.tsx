import api from "../api";

export default {
  getDepartments: () => api.get("getDeps"),
  createDepartment: (data: any) => api.post("createDep", data),
  deleteDepartment: (data: any) => api.delete("deleteDep", data),
  updateDepartment: (data: any) => api.put("updateDep", data),
};
