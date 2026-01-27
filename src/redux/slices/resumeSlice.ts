import apiClient from "@/lib/axios";
import { ResumeData, SaveResumePayload } from "@/types/resume-builder";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Async Thunk for saving resume to database
export const saveResume = createAsyncThunk(
  "resumeBuilder/saveResume",
  async (
    { user, resume_info, resume }: SaveResumePayload,
    { rejectWithValue },
  ) => {
    try {
      const submitData: SaveResumePayload = {
        user,
        resume_info,
        resume,
      };

      // Axios detects FormData and sets the header automatically.
      const response = await apiClient.post("resume/", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      // Handle Axios errors
      if (error instanceof AxiosError) {
        // Server responded with error status
        if (error.response) {
          const message =
            error.response.data?.message || "Uploading Resume Failed";
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

interface ResumeSliceState {
  data: ResumeData;
  isLoading: boolean;
  error: string | null;
}

const initialState: ResumeSliceState = {
  data: {
    addressPhonetic: "",
    fullName: "",
    birthdate: "",
    gender: "",
    email: "",
    address: "",
    postalCode: "",
    phone: "",
    photoUrl: "",
    education: [],
    work: [],
    age: 0,
    licenses: [],
    reasons: "",
    otherContact: {},
    preferences: [],
    namePhonetic: "",
  },
  isLoading: false,
  error: null,
};

export const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState,
  reducers: {
    updateResumeData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    // Reset error state
    clearError: (state) => {
      state.error = null;
    },
  },

  // Extra reducers for async thunk
  extraReducers: (builder) => {
    builder
      .addCase(saveResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveResume.fulfilled, (_, action) => {
        const savedResumeId = action.payload?.id || action.payload?.resumeId;
        return {
          ...initialState,
          savedResumeId,
          isLoading: false,
          error: null,
        };
      })
      .addCase(saveResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateResumeData } = resumeBuilderSlice.actions;

export default resumeBuilderSlice.reducer;
