import { createSlice } from "@reduxjs/toolkit";
import { GetAppliedJobsResponse } from "@/types/appliedJob";
import { fetchAppliedJobs } from "./jobsThunk";

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
