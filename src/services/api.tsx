import { create } from "apisauce";
import apiUrl from "./api.json";

const api = create({
  baseURL: apiUrl.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const checkAuthToken = () => {
  try {
    let token = localStorage.getItem("@accessToken");
    if (token) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
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
