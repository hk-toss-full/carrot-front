import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

const isDev = process.env.NODE_ENV === "development";

const devLog = (log: string) => {
  return isDev ? console.log(log) : null;
};

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { url, method } = config;
  devLog(`[API REQUEST] ${method?.toUpperCase()} ${url}`);

  return config;
};

const onRequestError = (config: AxiosRequestConfig) => {
  const { url, method } = config;
  devLog(`[API REQUEST ERROR] ${method?.toUpperCase()} ${url}`);

  return Promise.reject(config);
};

const onResponse = (response: AxiosResponse) => {
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

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
