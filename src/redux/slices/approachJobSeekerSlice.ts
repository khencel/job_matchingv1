import apiClient from "@/lib/axios";
import { JobSeekerApproachInterface } from "@/types/job-seeker";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const approachJobSeekerThunk = createAsyncThunk(
  "approachJobSeeker/approachJobSeekerThunk",
  async (file: FormData, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(
        "/api/jobApproach/send-file-to-email",
        file,
      );
      console.log(res.data);
    } catch (error) {
      return rejectWithValue(error);
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
      contactNumber: "",
      email: "",
      visaStatus: "notSure",
    },
    preferences: {
      preferredArea: "",
      preferredJobRole: "",
      preferredEmployment: "full-time",
      expectedSalary: null,
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
      skills: null,
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
