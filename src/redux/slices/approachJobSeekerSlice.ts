import { publicApi } from "@/lib/axios";
import { JobSeekerApproachInterface } from "@/types/job-seeker";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const approachJobSeekerThunk = createAsyncThunk(
  "approachJobSeeker/approachJobSeekerThunk",
  async (file: FormData, { rejectWithValue }) => {
    try {
      const res = await publicApi.post(
        "/jobApproach/send-file-to-email",
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(res.data);
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

interface ApproachJobSeekerState {
  isLoading: boolean;
  isError: boolean;
  data: JobSeekerApproachInterface;
}

const initialState: ApproachJobSeekerState = {
  isLoading: false,
  isError: false,
  data: {
    basicInfo: {
      fullName: "",
      nationality: "",
      dateOfBirth: "",
      japaneseLevel: "any",
      phone: "",
      email: "",
      visaStatus: "notSure",
    },
    preferences: {
      preferredArea: "",
      preferredJobRole: "",
      preferredEmployment: "full-time",
      expectedSalary: "",
      futureGoals: "",
    },
    currentJob: {
      companyNameOrIndustry: "",
      currentPrefecture: "",
      jobDuties: "",
      jobChangeDate: "",
      reasonForLeaving: "",
    },
    additionalInfo: {
      skills: "",
      dormPreference: null,
      notes: "",
    },
  },
};

const approachJobSeekerSlice = createSlice({
  name: "approachJobSeeker",
  initialState,
  reducers: {
    resetApproachJobSeekerState: () => initialState,
    updateApproachJobSeekerData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { resetApproachJobSeekerState, updateApproachJobSeekerData } =
  approachJobSeekerSlice.actions;
export default approachJobSeekerSlice.reducer;
