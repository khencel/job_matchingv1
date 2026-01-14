import { createAsyncThunk } from "@reduxjs/toolkit";
import { standard_get_api, standard_update_api } from "@/redux/features/api/api_request";


interface UpdateProfilePayload{
    details:any;
    avatar: File | null;
    banner: File | null;
    user_id: number;
}

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

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (payload: UpdateProfilePayload, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("details", JSON.stringify(payload.details));
            formData.append("avatar", payload.avatar ?? ""); // empty string kung null
            formData.append("banner", payload.banner ?? "");

    
            const res = await standard_update_api(`/api/auth/user/update/${payload.user_id}/`, formData);

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);