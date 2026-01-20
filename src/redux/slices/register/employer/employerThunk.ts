import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { publicApi } from "@/lib/axios";
import { User } from "../../login/authSlice";
import { RegisterUserArgs } from "@/types/user";

export const registerEmployerThunk = createAsyncThunk<
  User, // Return type
  RegisterUserArgs, // Argument type
  { rejectValue: string }
>("registerEmployer/Submit", async (formData, { rejectWithValue }) => {
  try {
    const response = await publicApi.post("auth/store", formData);
    return response.data;
  } catch (error) {
    console.log(error);
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response) {
        const message =
          error.response.data?.message ||
          "Registration failed. Please try again.";
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
>("registerEmployer/checkEmail", async (arg, { rejectWithValue }) => {
  try {
    // Use encodeURIComponent to handle special characters like '@' in the URL
    const res = await publicApi.get(
      `/auth/check-email/${encodeURIComponent(arg.email)}/`,
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
