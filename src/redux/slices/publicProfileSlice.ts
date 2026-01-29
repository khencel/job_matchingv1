import apiClient from "@/lib/axios";
import { User } from "@/types/user-register";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GetProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const getPublicProfile = createAsyncThunk<User, number>(
  "profile/getPublicProfile",
  async (user_id, { rejectWithValue }) => {
    try {
      const res = await apiClient(`auth/user/${user_id}`);
      return res.data;
    } catch (error) {
      console.log("Error visiting company profile", error);
      return rejectWithValue(error);
    }
  },
);

const initialState: GetProfileState = {
  user: null,
  loading: false,
  error: null,
};

const publicProfileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {
    clearUserProfile: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserProfile } = publicProfileSlice.actions;
export default publicProfileSlice.reducer;
