import { createSlice } from "@reduxjs/toolkit";
import { jobPostIndex } from "./jobPostThunk";

export interface JobPostState {
    items: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;

    next: string | null;
    previous: string | null;
    currentPage: number;
    pageSize: number;
    count: number;
}

const initialState: JobPostState = {
    items: [],
    status: "idle",
    error: null,

    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 10,
    count: 0,

}

export const jobPostSlice = createSlice({
    name: "jobPost",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(jobPostIndex.pending, (state) => {
                state.status = "loading";
            })
            .addCase(jobPostIndex.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(jobPostIndex.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || "Something went wrong";
            })
    },
})

export default jobPostSlice.reducer;
