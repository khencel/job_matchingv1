import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_get_api, standard_post_api } from "@/redux/features/api/api_request";

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

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data:any, { rejectWithValue }) => {
        try {
            const res = await standard_post_api('/api/auth/reset-password/',data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const createUser = createAsyncThunk(
    "auth/createUser",
    async (data:any, { rejectWithValue }) => {
        try {
            const res = await standard_post_api('/api/auth/store',data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)       

export const totalNoUser = createAsyncThunk(
    "auth/totalNoUser",
    async (year:any, { rejectWithValue }) => {
        try {
            const res = await standard_get_api('/api/auth/total-user?year='+year);
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
      
    