import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_post_api } from "@/redux/features/api/api_request";

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data:any, { rejectWithValue }) => {
        try {
            const res = await standard_post_api('/api/auth/forgot-password/',data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);