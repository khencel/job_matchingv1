import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "@/redux/slices/applicants/userThunk";


export interface UserState {
    items: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    next: string | null;
    previous: string | null;
    currentPage: number;
    pageSize: number;
    count: number;
}

const initialState: UserState = {
    items: [],
    status: 'idle',
    error: null,
    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 10,
    count: 0,   
} 

const getAllUserByFilter = createSlice ({
    name: "getAllUser",
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
            .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export const { setPage, setPageSize } = getAllUserByFilter.actions;
export default getAllUserByFilter.reducer;