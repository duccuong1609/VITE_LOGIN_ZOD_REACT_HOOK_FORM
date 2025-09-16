import axios from "axios";

export const msAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}/`,
  timeout: 60 * 1000, // 60s timeout
});

// ✅ Interceptor để mỗi request đều tự động lấy token mới nhất
msAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export const msPublicAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}/`,
  timeout: 60 * 1000,
});