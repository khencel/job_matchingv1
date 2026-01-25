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
          state.details.accountInfo = {
            ...state.details.accountInfo,
            [field]: value,
          };
        } else if (nestedField === "termsAndConditions") {
          state.details.termsAndConditions = {
            ...state.details.termsAndConditions,
            [field]: value,
          };
        } else {
          // Direct merge if structure differs
          state.details = { ...state.details, [field]: value };
        }
      }
    },
    setSupervisoryField: (
      state,
      action: PayloadAction<{
        field: string;
        value: string | number | boolean;
        nestedField?: string;
        subNestedField?: string;
      }>,
    ) => {
      // 1. Remove .supervisoryData check. Just check details.
      if (state.details) {
        const { field, value, nestedField, subNestedField } = action.payload;

        // A. Handle HQ Address (Level 3)
        if (nestedField === "companyInfo" && subNestedField === "hqAddress") {
          state.details.companyInfo.hqAddress = {
            ...state.details.companyInfo.hqAddress,
            [field]: value,
          };
        }
        // B. Handle Company Info (Level 2 - Direct fields like capital, industry)
        else if (nestedField === "companyInfo") {
          state.details.companyInfo = {
            ...state.details.companyInfo,
            [field]: value,
          };
        }
        // C. Handle Contact Person (Level 2)
        else if (nestedField === "contactPersonInfo") {
          state.details.contactPersonInfo = {
            ...state.details.contactPersonInfo,
            [field]: value,
          };
        }
        // D. Handle Account Info
        else if (nestedField === "accountInfo") {
          state.details.accountInfo = {
            ...state.details.accountInfo,
            [field]: value,
          };
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

export const {
  clearUpdateProfileState,
  setJobSeekerField,
  setSupervisoryField,
} = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
