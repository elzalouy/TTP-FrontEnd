import { create } from "apisauce";
import apiUrl from "./api.json";
import decode from "jwt-decode";
import { ITokenInfo } from "src/types/models/user";
const api = create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? apiUrl.API_DEV_URL
      : apiUrl.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const isAuthedUser = () => {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};
//
export const getUserTokenInfo = () => {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      let user: ITokenInfo = decode(token);
      return user;
    }
    return null;
  } catch (error) {}
};
export const isSM = () => {
  let token = getUserTokenInfo();
  if (token) {
    if (token.role === "SM") return true;
    else return false;
  }
};
export const isPM = () => {
  let token = getUserTokenInfo();
  if (token) {
    if (token.role === "PM") return true;
    else return false;
  }
  return false;
};
export const removeAuthToken = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  } catch (error) {}
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
  (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    removeAuthToken();
  }
);

export default api;
