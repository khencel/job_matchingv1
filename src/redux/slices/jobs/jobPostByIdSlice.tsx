import { JobPostById } from "@/types/applyJob";
import { fetchJobPostById } from "./jobsThunk";
import { createSlice } from "@reduxjs/toolkit";

interface JobPostByIdState {
  loading: boolean;
  error: string | null;
  data: JobPostById;
}

const initialState: JobPostByIdState = {
  loading: false,
  error: null,
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
};

const jobPostByIdSlice = createSlice({
  name: "jobPostById",
  initialState,
  reducers: {
    clearJobPostById: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchJobPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearJobPostById } = jobPostByIdSlice.actions;
export default jobPostByIdSlice.reducer;
