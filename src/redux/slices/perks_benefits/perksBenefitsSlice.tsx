import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPerksBenefits, indexPerksBenefits } from "@/redux/slices/perks_benefits/perksBenefitsThunk";


export interface PerksBenefitsItem {
    id: number;
    user: number;
    name: string;
    description: string;
    created_at: string;
}

export interface PerksBenefitsState {
    user: string | null;
    name: string;
    description: string;
    items: PerksBenefitsItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: PerksBenefitsState = {
    user: typeof window !== "undefined" ? localStorage.getItem("user_id"): null,
    name: "",
    description: "",
    status: "idle",
    error: null,
    items: [],
}


const perksAndBenefitsSlice = createSlice({
    name: "basicInfo",
    initialState,
    reducers:{
        setField: (state, action: PayloadAction<Partial<PerksBenefitsState>>) => {
            return { ...state, ...action.payload };
        },
        resetForm: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Add Perks 
            .addCase(addPerksBenefits.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addPerksBenefits.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.unshift(action.payload);
            })
            .addCase(addPerksBenefits.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string || "Something went wrong";
            })   


            // Index Perks 
            .addCase(indexPerksBenefits.pending, (state) => {
                state.status = "loading";   
            })
            .addCase(indexPerksBenefits.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.results;
            })
            .addCase(indexPerksBenefits.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string || "Something went wrong";
            })
    }
})

export const { setField, resetForm } = perksAndBenefitsSlice.actions;
export default perksAndBenefitsSlice.reducer;