import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "@/lib/axios";
import { RegisterSuperVisory } from "@/types/super-visory";

export const editSuperVisoryThunk = createAsyncThunk<
  void,
  void,
  { state: { registerSuperVisory: RegisterSuperVisory } }
>("registerSuperVisory/Edit", async (_, { getState, rejectWithValue }) => {
  const state = getState().registerSuperVisory;
  const data = state.registerSuperVisoryData;

  const submissionData = {
    details: JSON.stringify(data),
  };

  try {
    const response = await apiClient.patch("auth/update", submissionData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response) {
        const message = error.response.data?.message || "Update failed";
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
