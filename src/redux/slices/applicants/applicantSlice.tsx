import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchApplicants } from "@/redux/slices/applicants/applicantThunk";


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

const applicantSlice = createSlice({
    name: "applicants",
    initialState,
    reducers: {
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
            .addCase(fetchApplicants.pending, (state) => {state.status = 'loading';})
            .addCase(fetchApplicants.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchApplicants.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export const { setPage, setPageSize } = applicantSlice.actions;
export default applicantSlice.reducer;

