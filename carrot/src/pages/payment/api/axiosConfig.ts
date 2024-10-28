// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Vite 환경 변수 사용
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
