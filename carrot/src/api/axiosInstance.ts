import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { InstanceResponseData } from "./types/commonType";

const axiosInstance: Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

const isDev = process.env.NODE_ENV === "development";

const devLog = (log: string) => {
  return isDev ? console.log(log) : null;
};

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { url, method, headers } = config;

  if (headers?.requiresAuth) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    delete config.headers.requiresAuth;
  }

  devLog(`[API REQUEST] ${method?.toUpperCase()} ${url}`);
  return config;
};

const onRequestError = (config: AxiosRequestConfig) => {
  const { url, method } = config;
  devLog(`[API REQUEST ERROR] ${method?.toUpperCase()} ${url}`);
  return Promise.reject(config);
};

const onResponse = (
  response: AxiosResponse<InstanceResponseData>
): AxiosResponse<InstanceResponseData> => {
  const { status } = response;
  const { url, method } = response.config;
  devLog(`[API RESPONSE ${status}] ${method?.toUpperCase()} ${url}`);
  return response;
};

const onResponseError = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const { url, method } = error.request;
    devLog(`[API REQUEST ERROR ${method?.toUpperCase()}] ${url}`);
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
