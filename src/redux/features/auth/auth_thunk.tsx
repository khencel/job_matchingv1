import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_get_api } from "../api/api_request";

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        const user_id = localStorage.getItem("user_id");
        try {
            const response = await standard_get_api(`/api/auth/user/${user_id}`)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }

)