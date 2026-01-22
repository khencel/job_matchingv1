import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "@/lib/axios"; // Adjust path to your axios instance
import { AxiosError } from "axios";
import {
  GetAppliedJobsParams,
  GetAppliedJobsResponse,
} from "@/types/appliedJob";

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
      const response = await apiClient.get("apply/", {
        params: {
          page: page,
          page_size: page_size,
        },
      });

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

export interface AppliedJobState {
  appliedJob: GetAppliedJobsResponse;
  loading: boolean;
  error: string | null;
}

const initialState: AppliedJobState = {
  appliedJob: { count: 0, next: null, previous: null, results: [] },
  loading: false,
  error: null,
};

const appliedJobSlice = createSlice({
  name: "appliedJob",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJob.results = action.payload.results;
        state.appliedJob.count = action.payload.count;
        state.appliedJob.next = action.payload.next;
        state.appliedJob.previous = action.payload.previous;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appliedJobSlice.reducer;
