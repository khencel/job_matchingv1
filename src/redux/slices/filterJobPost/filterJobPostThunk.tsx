import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_post_api } from "@/redux/features/api/api_request";

export const filterJobPostV1 = createAsyncThunk(
    "job/filterJobPost",
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await standard_post_api('/api/job/list', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)