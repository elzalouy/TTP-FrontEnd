import api from "../api";

export default {
  getNotifi: (id:string) => api.get(`getAllNotifi?id=${id}`),
  updateNotifi: (data: any) => api.put("updateNotifi", data),
};
