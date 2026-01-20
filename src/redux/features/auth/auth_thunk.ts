import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  LoginResponse,
  forceLogout,
} from "@/redux/slices/login/authSlice";
import { AxiosError } from "axios";
import {
  getCurrentUserApi,
  loginApi,
  LoginPayload,
  logoutApi,
  verifyToken,
} from "./authService";
import { RootState } from "@/redux/store";
import { User } from "@/types/user-register";

interface GetUserResponse {
  message: string;
  user: User;
}

// Async thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk<
  GetUserResponse,
  void,
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    // AUTOMATIC: Your Axios Interceptor attaches the Bearer token here.
    const res = await getCurrentUserApi();
    console.log(res);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // 1. Handle Server Errors (400, 401, 404, 500)
      if (error.response?.data) {
        const data = error.response.data;

        // PREVENT CRASH: Extract the text string from the object
        if (data.detail) return rejectWithValue(data.detail);
        if (typeof data === "string") return rejectWithValue(data);

        // Fallback for complex objects
        return rejectWithValue("Failed to load user profile");
      }
      // 2. Handle Network Errors (Server offline / WiFi dead)
      if (error.request) {
        return rejectWithValue("Network error. Unable to reach server.");
      }
    }
    // 3. Fallback
    return rejectWithValue("An unexpected error occurred.");
  }
});

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (arg, { rejectWithValue }) => {
  const email = arg.email;
  const password = arg.password;

  try {
    const res = await loginApi({ email, password });

    if (res.data.user.is_email_verified === false) {
      return res.data;
    }
    // 7 days expiry for refresh token
    Cookies.set("refreshToken", res.data.refresh, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    // 1 hour expiry for access token
    Cookies.set("access", res.data.access, {
      expires: 1 / 24,
      secure: true,
      sameSite: "strict",
    });

    return res.data;
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response) {
        const message = error.response.data;
        return rejectWithValue(message);
      }
      // Network error (no response)
      if (error.request) {
        return rejectWithValue("Network error. Please check your connection.");
      }
    }
    // Generic error fallback
    return rejectWithValue("An unexpected error occurred. Please try again.");
  }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      dispatch(forceLogout());
      localStorage.clear();
      Cookies.remove("access");
      Cookies.remove("refreshToken");
      return rejectWithValue("No refresh token available");
    }

    try {
      await logoutApi(refreshToken);
      return;
    } catch (error) {
      console.log("Force logout due to error:", error);
    } finally {
      localStorage.clear();
      Cookies.remove("access");
      Cookies.remove("refreshToken");
    }
  },
);

// verify token thunk
export const verifyAccessToken = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/verifyToken", async (_, { dispatch, rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const accessToken = state.authState.access;

  if (!accessToken) {
    dispatch(forceLogout());
    Cookies.remove("refreshToken");
    Cookies.remove("access");
    return rejectWithValue("No access token available");
  }

  try {
    await verifyToken(accessToken);
    return;
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response) {
        const message =
          error.response.data.detail || "Token verification failed";
        return rejectWithValue(message);
      }
      // Network error (no response)
      if (error.request) {
        return rejectWithValue("Network error. Please check your connection.");
      }
    }
    // Generic error fallback
    return rejectWithValue("An unexpected error occurred. Please try again.");
  }
});
