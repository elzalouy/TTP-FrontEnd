import api from "../api";

export default {
  httpGetNotifications: (data: any) => api.get(`/sendNotifications${data}`),
  httpUpdateNotified: () => api.put("/updateNotified"),
  httpGetUnNotified: () => api.get("/getUnNotified"),
};
