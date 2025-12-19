import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "@/app/(util)/toaster";
import loginApi from "@/redux/features/auth/authService";

interface AuthState {
  user: any | null; // Replace 'any' with your user type
  access: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated?: boolean;
}


interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: any;
  access: string;
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
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    const email = payload.email;
    const password = payload.password;

    try{
        const res = await loginApi({ email, password });
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data;
    }catch(error: any){
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.access = action.payload.access;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
