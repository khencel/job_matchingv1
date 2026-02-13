import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "/api",
  // `${process.env.NEXT_PUBLIC_API_BASE_URL}` || "http://localhost:8000/api/", // --> For development, we can use the proxy setup in next.config.ts
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicApi = axios.create({
  baseURL: "/api",
  // `${process.env.NEXT_PUBLIC_API_BASE_URL}` || "http://localhost:8000/api/", // --> For development, we can use the proxy setup in next.config.ts
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// Request interceptor - Add access token to headers
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request to retry after token refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        // No refresh token available, force logout
        Cookies.remove("access");
        Cookies.remove("refreshToken");
        localStorage.clear();
        processQueue(new Error("No refresh token available"), null);
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/"}auth/token/refresh`,
          { refresh: refreshToken },
          { withCredentials: true },
        );

        const newAccessToken = refreshResponse.data.access;
        const newRefreshToken = refreshResponse.data.refresh;

        // Update tokens in cookies
        Cookies.set("access", newAccessToken, {
          expires: 1 / 24,
          secure: true,
          sameSite: "strict",
        });

        Cookies.set("refreshToken", newRefreshToken, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        // Update the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process the queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and reject
        Cookies.remove("access");
        Cookies.remove("refreshToken");
        localStorage.clear();
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
