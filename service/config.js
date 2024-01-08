import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance with a common base URL
const token = Cookies.get("userToken");
const api = axios.create({
  // baseURL: "https://hrmsstrapi.onrender.com/api",
  baseURL: "http://localhost:1337/api",
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userToken"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
