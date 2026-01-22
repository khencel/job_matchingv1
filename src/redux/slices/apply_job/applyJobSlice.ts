import { createSlice } from "@reduxjs/toolkit";
import {
  ApplyToJobResponse,
  GetAppliedJobResponse,
  JobPosting,
} from "@/types/applyJob";
import { applyToJob, getAppliedJobs, getJobPostings } from "./applyJobThunk";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface ApplyToJobState {
  jobPosts: JobPosting[];
  jobPostsStatus: RequestStatus;
  jobPostsError: string | null;
  applyStatus: RequestStatus;
  applyError: string | null;
  lastApplication: ApplyToJobResponse | null;
  appliedJobs: GetAppliedJobResponse | null;
  appliedJobsStatus: RequestStatus;
  appliedJobsError: string | null;
}

const initialState: ApplyToJobState = {
  jobPosts: [],
  jobPostsStatus: "idle",
  jobPostsError: null,
  applyStatus: "idle",
  applyError: null,
  lastApplication: null,
  appliedJobs: null,
  appliedJobsStatus: "idle",
  appliedJobsError: null,
};

const applyJobSlice = createSlice({
  name: "applyJob",
  initialState,
  reducers: {
    resetApplyStatus(state) {
      state.applyStatus = "idle";
      state.applyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Job Postings
      .addCase(getJobPostings.pending, (state) => {
        state.jobPostsStatus = "loading";
        state.jobPostsError = null;
      })
      .addCase(getJobPostings.fulfilled, (state, action) => {
        state.jobPostsStatus = "succeeded";
        state.jobPosts = action.payload;
      })
      .addCase(getJobPostings.rejected, (state, action) => {
        state.jobPostsStatus = "failed";
        state.jobPostsError =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch job postings.";
      })
      // Apply to Job
      .addCase(applyToJob.pending, (state) => {
        state.applyStatus = "loading";
        state.applyError = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.applyStatus = "succeeded";
        state.lastApplication = action.payload;
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.applyStatus = "failed";
        state.applyError =
          (action.payload as string) ||
          action.error.message ||
          "Failed to apply for job.";
      })
      // Get Applied Jobs
      .addCase(getAppliedJobs.pending, (state) => {
        state.appliedJobsStatus = "loading";
        state.appliedJobsError = null;
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobsStatus = "succeeded";
        state.appliedJobs = action.payload;
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.appliedJobsStatus = "failed";
        state.appliedJobsError =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch applied jobs.";
      });
  },
});

export const { resetApplyStatus } = applyJobSlice.actions;

export default applyJobSlice.reducer;
