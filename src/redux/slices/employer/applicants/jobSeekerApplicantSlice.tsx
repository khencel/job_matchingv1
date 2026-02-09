import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJobSeekerApplicant } from "@/redux/slices/employer/applicants/jobSeekerApplicantThunk";



export interface ApplicantState {
    items: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    next: string | null;
    previous: string | null;
    currentPage: number;
    pageSize: number;
    count: number;
}

const initialState: ApplicantState = {
    items: [],
    status: 'idle',
    error: null,
    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 10,
    count: 0,
}

const jobSeekerApplicant = createSlice({
    name:"JobSeekerApplicant",
    initialState,
    reducers:{
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobSeekerApplicant.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobSeekerApplicant.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.results;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                state.count = action.payload.count;
                
            })
            .addCase(fetchJobSeekerApplicant.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },

});

export const { setPage, setPageSize } = jobSeekerApplicant.actions;
export default jobSeekerApplicant.reducer;