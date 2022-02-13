import axios from "axios";

export default axios.create({
  baseURL: "https://zid-app-backend.herokuapp.com/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials:true,
  headers: {
    "Content-type": "application/json"
  }
});   