import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api",
  withCredentials: true, // Quan trọng để gửi kèm cookie
});

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig & { _retry?: boolean };
}

let isRefreshing = false;
let refreshPromise: Promise<AxiosResponse> | null = null;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown): void => {
  failedQueue.forEach(({ reject }) => reject(error));
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      if (isRefreshing && refreshPromise) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      refreshPromise = axios.post(
        "http://localhost:8081/api/refresh-token",
        {},
        { withCredentials: true }
      );

      try {
        await refreshPromise;
        failedQueue = [];

        return axiosInstance(originalRequest); 
      } catch (refreshErr) {
        processQueue(refreshErr);
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
