import api from "../api";
export default {
  signIn: (data:any) => api.post("signIn",data),
  signOut: (data: any) => api.post("logout", data),
  newPasword: (data: any) => api.put("newPassword", data),
  forgotPassword: () => api.post("forgetPassword"),
};
