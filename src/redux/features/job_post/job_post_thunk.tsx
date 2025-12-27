import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PostBasicInfoState } from "@/redux/slices/employer/post_a_job/basicInfoSlice";
import postAPI from "@/redux/features/api/api_request";
import { fetchAPI } from "@/redux/features/api/api_request";


export const createJobPost = createAsyncThunk(
    "jobPost/createJobPost",
    async (jobData: PostBasicInfoState, {rejectWithValue}) => {
        try {
            const response = await postAPI(jobData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const listJobPost = createAsyncThunk(
    "jobPost/listJobPost",
    async (user_id:number, {rejectWithValue}) => {
        try {
            const response = await fetchAPI(user_id);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)