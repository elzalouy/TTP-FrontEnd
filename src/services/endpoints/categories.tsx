import api from "../api";
export default {
  getCategories: () => api.get("getCategories"),
  createCategory: (data: any) => api.post("createCategory", data),
  updateCategory: (data: any) => api.put("updateCategory", data),
  deleteCategory: (data: { id: string }) =>
    api.delete("deleteCategory", { data }),
};
