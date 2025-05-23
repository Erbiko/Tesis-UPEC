import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token enviado:", token); //vericando el token 
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
