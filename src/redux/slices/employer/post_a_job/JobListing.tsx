import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { listJobPost } from '@/redux/features/job_post/job_post_thunk';

interface ItemState {
    items: any[];
    loading: boolean;
    error: string | null;
    status?: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
    status: "idle"
};

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(listJobPost.pending, state => {state.status = "loading"})
        .addCase(listJobPost.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.items = action.payload
        })
        .addCase(listJobPost.rejected, state => {state.status = "failed"})
    }
});

export default itemSlice.reducer;