import { create } from "apisauce";
import { API_BASE_URL, API_DEV_URL } from "./api.json";
// import R from 'reactotron-react-native';

const api = create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const setAuthToken = (token: string) => {
  try {
    localStorage.setItem("@accessToken", token);
  } catch (e) {
    console.log(e);
  }
};

api.axiosInstance.interceptors.request.use(
  (config: any) => {
    const value = localStorage.getItem("@accessToken");
    if (value) {
      config.headers.Authorization = `Bearer ${value}`;
    }
    return config;
  },
  (error: any) => {
    return error;
  }
);

export default api;
