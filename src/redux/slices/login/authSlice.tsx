import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface AuthState {
  user: any | null; // Replace 'any' with your user type
  access: string | null;
  loading: boolean;
  error: string | null;
}


interface LoginPayload {
  email: string;
  password: string;
}

// Define the response type from API
interface LoginResponse {
  user: any; // Replace 'any' with your user type
  access: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  access: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>("http://127.0.0.1:8000/api/auth/login", payload);
      return response.data;
    } catch (error: any) {
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
