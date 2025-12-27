import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { listJobPost, deleteJobPost } from '@/redux/features/job_post/job_post_thunk';

interface ItemState {
    items: any[];
    count: number;
    next: string | null;
    previous: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    loading: boolean;
    currentPage: number;
    pageSize: number;
}

const initialState: ItemState = {
    items: [],
    count: 0,
    next: null,
    previous: null,
    status: 'idle',
    error: null,
    loading: false,
    currentPage: 1,
    pageSize: 10,
};

const itemSlice = createSlice({
    name: 'items',
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
        .addCase(listJobPost.pending, state => {state.status = "loading"})
        .addCase(listJobPost.fulfilled, (state, action) => {
            state.loading = false;
            state.status = 'succeeded';
            state.items = action.payload.results;
            state.count = action.payload.count;
            state.next = action.payload.next;
            state.previous = action.payload.previous;
        })
        .addCase(listJobPost.rejected, state => {state.status = "failed"})

        .addCase(deleteJobPost.pending, state => {state.status = "loading"})
        .addCase(deleteJobPost.fulfilled, (state, action) => {
            state.loading = false;
            state.status = 'succeeded';
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.count -= 1;
        })
        .addCase(deleteJobPost.rejected, state => {state.status = "failed"})
    }
});

export const { setPage, setPageSize } = itemSlice.actions;
export default itemSlice.reducer;