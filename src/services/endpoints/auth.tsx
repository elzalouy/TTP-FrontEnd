import api from "../api";
export default {
  signIn: (data:any) => api.post("signIn",data),
  signOut: () => api.post("logout"),
  newPasword: (data: any) => api.put("newPassword", data),
  forgotPassword: (data:any) => api.post("forgetPassword",data),
};
