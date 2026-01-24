import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";
// Assuming these types exist based on your code

interface UpdateProfileState {
  loading: boolean;
  error: string | null;
  details: any | null;
}

const initialState: UpdateProfileState = {
  loading: false,
  error: null,
  details: null,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    clearUpdateProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.details = null;
    },
    // NEW: Handle text changes in the form
    setJobSeekerField: (
      state,
      action: PayloadAction<{
        field: string;
        value: string;
        nestedField?: string;
      }>,
    ) => {
      if (state.details && state.details.jobSeekerData) {
        const { field, value, nestedField } = action.payload;

        // If the data is nested inside 'jobSeekerData' (like firstName, lastName)
        if (nestedField === "jobSeekerData") {
          state.details.jobSeekerData = {
            ...state.details.jobSeekerData,
            [field]: value,
          };
        }
        // If it's on the account info level (like email)
        else if (nestedField === "accountInfo") {
          // Handle account info updates if your backend allows it
        } else {
          // Direct merge if structure differs
          state.details = { ...state.details, [field]: value };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        // logic: Populate the form with existing user data when we fetch
        state.details =
          action.payload.user.userDetails_job_seeker ||
          action.payload.user.userDetails_supervisory;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUpdateProfileState, setJobSeekerField } =
  updateProfileSlice.actions;
export default updateProfileSlice.reducer;
