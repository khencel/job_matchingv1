import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/axios";
import { AxiosError } from "axios";
import { RegisterJobSeeker } from "@/types/job-seeker";

export const registerJobSeekerThunk = createAsyncThunk<
  void,
  void,
  { state: { registerJobSeeker: RegisterJobSeeker } }
>("registerJobSeeker/Submit", async (_, { getState, rejectWithValue }) => {
  const state = getState().registerJobSeeker;
  const data = state.registerJobSeekerData;

  const submissionData = {
    email: data.accountInfo.email,
    first_name: data.jobSeekerData.firstName,
    last_name: data.jobSeekerData.lastName,
    password: data.accountInfo.password,
    user_type: "job_seeker",
    details: JSON.stringify(data),
  };

  try {
    const response = await apiClient.post("auth/store", submissionData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response?.status === 400) {
        return rejectWithValue("Email already exist");
      }
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

export const isEmailExistThunk = createAsyncThunk<
  { exists: boolean },
  { email: string },
  { rejectValue: string }
>("registerJobSeeker/checkEmail", async (arg, { rejectWithValue }) => {
  try {
    // Use encodeURIComponent to handle special characters like '@' in the URL
    const res = await apiClient.get(
      `/auth/check-email/${encodeURIComponent(arg.email)}/`
    );
    // Logic Check: If your backend returns 200 OK but { exists: true }
    if (res.data.exists) {
      return rejectWithValue("Email already exists");
    }

    return res.data; // Usually { exists: false }
  } catch (error) {
    if (error instanceof AxiosError) {
      // If backend returns 400 or 409 when email is taken
      if (error.response?.status === 400 || error.response?.status === 409) {
        return rejectWithValue("Email already exists");
      }
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Verification failed";
      return rejectWithValue(message);
    }
    return rejectWithValue("Connection error. Please try again.");
  }
});
