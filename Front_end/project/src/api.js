// src/api.js
import axios from "axios";

const API = "http://localhost:5000";

const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage (frontend):", token); // 👈 This logs before every request

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
