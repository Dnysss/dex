import axios from "axios";
import { localStorageKeys } from "../app/config/localStorageKeys";

const api = axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:8080",
});

// Intercepta as requisições para adicionar o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
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
