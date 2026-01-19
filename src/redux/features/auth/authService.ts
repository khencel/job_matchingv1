import apiClient from "@/lib/axios";

interface LoginBody {
  email: string;
  password: string;
}
// API call for login
export function loginApi(data: LoginBody) {
  return apiClient.post("/auth/login", data);
}
// API call for refreshing token
export function refreshTokenApi(refresh: string) {
  return apiClient.post("/auth/token/refresh", { refresh });
}
// API call for verifying token
export function verifyToken(token: string) {
  return apiClient.post("/auth/token/verify", { token });
}
// API call for logout
export function logoutApi(token: string) {
  return apiClient.post("/auth/logout", { token });
}
// API call for fetching current user
export function fetchCurrentUserApi() {
  return apiClient.get("/auth/get-user");
}
