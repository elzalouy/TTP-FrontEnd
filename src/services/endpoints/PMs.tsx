import api from "../api";

export default {
  getUsers: () => api.get("getUsers"),
  createPm: (data: object): any => api.post("createPm", data),
  createOm: (data: object): any => api.post("createOm", data),
  createSm: (data: object): any => api.post("createSm", data),
  updatePassword: (data: object) => api.put("updatePassword", data),
  resetPassword: (data: object) => api.put("resetPassword", data),
  updateUser: (data: object) => api.post("updateUser", data),
  getUser: (data: object) => api.get("getUser", data),
  resendMail: (data: object) => api.post("createUser/resendMail", data),
  deleteUser: (id: string) =>
    api.delete("deleteUser", {
      _id: id,
    }),
};
