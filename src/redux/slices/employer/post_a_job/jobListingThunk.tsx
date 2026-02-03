import { standard_get_api } from "@/redux/features/api/api_request";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const showAllJobs = createAsyncThunk(
    "job/showAllJobs",
    async ( _, {rejectWithValue}) => {
        try {
            const response = await standard_get_api('/api/job/list');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
        
)

export const jobPostChangeStatus = createAsyncThunk(
    "job/jobPostChangeStatus",
    async(post_id:number, {rejectWithValue}) => {
        try {
            const response = await standard_get_api(`/api/job/change-post-status/${post_id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)