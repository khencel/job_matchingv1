import { fetchCurrentUser, loginUser } from "@/redux/features/auth/auth_thunk";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
interface AuthState {
  user: User | null;
  access: string | null;
  loading: boolean;
  error: SerializedError | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  avatar_url: string | null;
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    forceLogout: (state) => {
      state.user = null;
      state.access = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.access = action.payload.access;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? { message: action.payload }
          : { message: "Login failed" };
      })

      // Fetch current user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        },
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { forceLogout } = authSlice.actions;
export default authSlice.reducer;
