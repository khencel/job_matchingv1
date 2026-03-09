import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPerksBenefits, indexPerksBenefits, deletePerksBenefits, updatePerksBenefits, indexPerksBenefitsByUserID } from "@/redux/slices/perks_benefits/perksBenefitsThunk";


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
        resetForm: (state) => {
            state.name = "";
            state.description = "";
            state.error = null;
            state.status = "idle";
        },
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

        builder
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

        builder
            // index base on userID 
            .addCase(indexPerksBenefitsByUserID.pending, (state) => {
                state.status = "loading";   
            })
            .addCase(indexPerksBenefitsByUserID.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.results;
                
            })
            .addCase(indexPerksBenefitsByUserID.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string || "Something went wrong";
            })
        
            // Delete Perks 
        builder
            .addCase(deletePerksBenefits.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePerksBenefits.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            })
            .addCase(deletePerksBenefits.rejected, (state, action) => {
                state.status = "failed";
            })

            // Update Perks 
        builder
            .addCase(updatePerksBenefits.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePerksBenefits.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload; 
                }
            })
            .addCase(updatePerksBenefits.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || "Update failed";
            })
             
    }
})

export const { setField, resetForm } = perksAndBenefitsSlice.actions;
export default perksAndBenefitsSlice.reducer;