import { JobPostDetails } from "@/types/appliedJob";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJobDetails } from "./jobsThunk";

interface JobPostState {
  loading: boolean;
  error: string | null;
  jobDetails: JobPostDetails | null;
}

const initialState: JobPostState = {
  loading: false,
  error: null,
  jobDetails: null,
};

const jobPostSlice = createSlice({
  name: "jobPost",
  initialState,
  reducers: {
    setJobPostDetails: (state, action: PayloadAction<JobPostDetails>) => {
      state.jobDetails = action.payload;
    },
    clearJobPostDetails: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJobDetails.fulfilled,
        (state, action: PayloadAction<JobPostDetails>) => {
          state.loading = false;
          state.jobDetails = action.payload;
        },
      )
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setJobPostDetails, clearJobPostDetails } = jobPostSlice.actions;
export default jobPostSlice.reducer;
