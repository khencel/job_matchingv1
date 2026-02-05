import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_post_api } from "@/redux/features/api/api_request";


export const createJobApproach = createAsyncThunk(
    "jobApproach/createJobApproach",
    async ( payload:any, {rejectWithValue}) => {
        try {
            const response = await standard_post_api('/api/jobApproach/send-file-to-email',payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)