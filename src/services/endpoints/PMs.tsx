import api from "../api";


export default {
  getUsers: () => api.get("getUsers"),
  createUser: (data:object) => api.post("createUser",data),
  updatePassword : (data:object) => api.put("updatePassword",data),
  updateUser: (data:object) => api.post("updateUser",data),
  deleteUser: (id:string) => api.delete("deleteUser",{
    _id:id
  })
};
