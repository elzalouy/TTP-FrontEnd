import { create } from "apisauce";
import apiUrl from "./api.json";
const api = create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? apiUrl.API_DEV_URL
      : apiUrl.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const checkAuthToken = () => {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const removeAuthToken = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  } catch (error) {
    console.log(error);
  }
};

export const setAuthToken = (token: string) => {
  try {
    localStorage.setItem("token", token);
  } catch (e) {}
};

api.axiosInstance.interceptors.request.use(
  (config: any) => {
    const value = localStorage.getItem("token");
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
