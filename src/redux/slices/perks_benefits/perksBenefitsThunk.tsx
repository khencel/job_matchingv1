import { createAsyncThunk } from "@reduxjs/toolkit";
import { PerksBenefitsState } from "./perksBenefitsSlice";
import { standard_get_api, standard_post_api } from "@/redux/features/api/api_request";



export const addPerksBenefits = createAsyncThunk(
    "perks/addPerksBenefits",
    async (data: PerksBenefitsState, {rejectWithValue}) => {
        try {
            const response = await standard_post_api('/api/perks/', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const indexPerksBenefits = createAsyncThunk(
    "perks/indexPerksBenefits",
    async (user_id: number, {rejectWithValue}) => {
        try {
            const response = await standard_get_api(`/api/perks/`);
            return response.data;
        } catch (error:any){
            return rejectWithValue(error.response.data);
        }

    }
)