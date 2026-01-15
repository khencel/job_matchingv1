import { createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "@/redux/slices/profile/profilethunk";

interface ProfileState {
    profile: any;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    status: "idle",
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GET PROFILE
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || "Something went wrong";
            })

        // UPDATE PROFILE 
        builder
            .addCase(updateProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = {
                    ...state.profile,
                    ...action.payload,
                };
                state.status = "succeeded";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string || "Failed to update profile";
            })

    }
        
})

export default profileSlice.reducer;




    