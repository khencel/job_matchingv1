import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_get_api } from "@/redux/features/api/api_request";

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async(user_id:number,{ rejectWithValue}) => {
        try {
            const res = await standard_get_api(`/api/auth/user/${user_id}`)
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)