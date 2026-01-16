import { createAsyncThunk } from "@reduxjs/toolkit";
import { PerksBenefitsState, PerksBenefitsItem } from "./perksBenefitsSlice";
import { standard_get_api, standard_post_api, standard_delete_api, standard_update_api } from "@/redux/features/api/api_request";



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

export const deletePerksBenefits = createAsyncThunk(
    "perks/deletePerksBenefits",
    async (item_id: number, {rejectWithValue}) => {
        try {
            const response = await standard_delete_api(`/api/perks/${item_id}/`);
            return { id: item_id };
        } catch (error:any){
            return rejectWithValue(error.response.data);
        }
    }
)

export const updatePerksBenefits = createAsyncThunk<
    PerksBenefitsItem, 
    Partial<PerksBenefitsItem> & { id: number }, 
    { rejectValue: string }
>(
    "perks/updatePerksBenefits",
    async (data, { rejectWithValue }) => {
        try {
            const response = await standard_update_api(`/api/perks/${data.id}/`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);
