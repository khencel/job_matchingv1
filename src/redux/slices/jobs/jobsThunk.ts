import {
  GetAppliedJobsParams,
  GetAppliedJobsResponse,
} from "@/types/appliedJob";
import {
  ApplyToJobRequest,
  ApplyToJobResponse,
  JobPosting,
} from "@/types/applyJob";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  getAppliedJobs,
  getJobById,
  getJobPostings,
  postApplyToJob,
} from "./jobServices";

// Thunk to get job postings
export const fetchJobPostings = createAsyncThunk<JobPosting[]>(
  "applyJob/getJobPostings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getJobPostings();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const applyToJob = createAsyncThunk<
  ApplyToJobResponse,
  ApplyToJobRequest
>("applyJob/applyToJob", async ({ user, job_post }, { rejectWithValue }) => {
  try {
    const res = await postApplyToJob(user, job_post);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Thunk to get applied jobs with pagination
export const fetchAppliedJobs = createAsyncThunk<
  GetAppliedJobsResponse, // Return Type (Success)
  GetAppliedJobsParams, // Argument Type (Input)
  { rejectValue: string } // Error Type
>(
  "jobApply/fetchAppliedJobs",
  async ({ page, page_size }, { rejectWithValue }) => {
    try {
      // Axios 'params' automatically formats the URL to:
      // /api/apply/?page=1&page_size=10
      const response = await getAppliedJobs(page, page_size);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(
            error.response.data?.message || "Failed to fetch applied jobs.",
          );
        }
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);

// Get Job by Id
export const fetchJobDetails = createAsyncThunk(
  "jobApply/fetchJobById",
  async (jobId: number, { rejectWithValue }) => {
    try {
      const res = await getJobById(jobId);
      return res.data;
    } catch (error) {
      console.log("Error fetching job details:",error)
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(
            error.response.data?.message || "Failed to fetch job details.",
          );
        }
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);
