import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  LoginPayload,
  LoginResponse,
  forceLogout,
} from "@/redux/slices/login/authSlice";
import { AxiosError } from "axios";
import {
  fetchCurrentUserApi,
  loginApi,
  logoutApi,
  verifyToken,
} from "./authService";
import { RootState } from "@/redux/store";

// Async thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCurrentUserApi();
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
          return rejectWithValue(
            "Network error. Please check your connection.",
          );
        }
      }
      // Generic error fallback
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  },
);

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

// // refresh token thunk
// export const refreshToken = createAsyncThunk<
//   { access: string },
//   void,
//   { rejectValue: string }
// >("auth/refreshToken", async (_, { rejectWithValue }) => {
//   const refreshToken = Cookies.get("refreshToken"); // Get refresh token from cookies

//   if (!refreshToken) {
//     return rejectWithValue("No refresh token available");
//   }

//   // Verify refresh token before using it
//   try {
//     const res = await refreshTokenApi(refreshToken);

//     // Update refresh token in cookies
//     Cookies.set("refreshToken", res.data.refresh, {
//       expires: 7,
//       secure: true,
//       sameSite: "strict",
//     });

//     if (res.data.user.is_email_verified === false) {
//       return res.data;
//     }
//     // Update access token in cookies
//     Cookies.set("access", res.data.access, {
//       expires: 1 / 24,
//       secure: true,
//       sameSite: "strict",
//     });

//     return { access: res.data.access };
//   } catch (error) {
//     // Handle Axios errors
//     if (error instanceof AxiosError) {
//       // Server responded with error status
//       if (error.response) {
//         const message = error.response.data.detail || "Token refresh failed";
//         return rejectWithValue(message);
//       }
//       // Network error (no response)
//       if (error.request) {
//         return rejectWithValue("Network error. Please check your connection.");
//       }
//     }
//     // Generic error fallback
//     return rejectWithValue("An unexpected error occurred. Please try again.");
//   }
// });
