import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

import {loginApi} from "../../features/auth/authService";

interface AuthState {
  user: User | null; // Replace 'any' with your user type
  access: string | null;
  loading: boolean;
  error: SerializedError | null;
  isAuthenticated?: boolean;
}

interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_email_verified: boolean;
  role: string;
}
export interface LoginResponse {
  refresh: string;
  access: string;
  user: User;
  
}

// Initial state
const initialState: AuthState = {
  user: null,
  access: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

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
    Cookies.set("refreshToken", res.data.refresh, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    if(res.data.user.is_email_verified === false){
      return res.data;
    }

    Cookies.set("access", res.data.access, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    localStorage.setItem("token", res.data.access);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("user_id", res.data.user.id.toString());
  
    return res.data;
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response) {
        const message = error.response.data?.message || "Registration failed";
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.error = null;
      state.isAuthenticated = false;
      Cookies.remove("refreshToken");
      Cookies.remove("access");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.access = action.payload.access;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload
            ? { message: action.payload }
            : { message: "Login failed" };
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
