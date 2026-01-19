import { fetchCurrentUser, loginUser } from "@/redux/features/auth/auth_thunk";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { RegisterEmployerData } from "../register/employer/employerSlice";
import { RegisterJobSeekerData } from "../register/job-seeker/jobseekerSlice";
import { RegisterSuperVisoryData } from "../register/super-visory/superVisorySlice";
export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_email_verified: boolean;
  role: "job_seeker" | "employer" | "admin";
  avatar?: string | null; // Optional (From GetUser)
  banner?: string | null; // Optional (From GetUser)

  // 2. HANDLE DYNAMIC DETAILS (The key to your problem)
  // Make them optional (?). Login won't have them, GetUser will.
  userDetails_emp?: RegisterEmployerData | null;
  userDetails_job_seeker?: RegisterJobSeekerData | null;
  userDetails_supervisory?: RegisterSuperVisoryData | null;
}
interface AuthState {
  user: User | null;
  access: string | null;
  loading: boolean;
  error: SerializedError | null;
  isInitialized?: boolean;
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
  isInitialized: false,
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
      state.isInitialized = true;
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
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isInitialized = true;
      });
  },
});

export const { forceLogout } = authSlice.actions;
export default authSlice.reducer;
