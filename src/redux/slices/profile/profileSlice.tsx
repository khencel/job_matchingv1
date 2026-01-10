import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "@/redux/slices/profile/profilethunk";

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
    }
        
})

export default profileSlice.reducer;




    