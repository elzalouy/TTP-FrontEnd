import api from "../api";

export default {
  getNotifi: (data:{id:string,skip:number}) => api.get(`getAllNotifi?id=${data.id}&skip=${data.skip}`),
  updateNotifi: (data: any) => api.put("updateNotifi", data),
};
