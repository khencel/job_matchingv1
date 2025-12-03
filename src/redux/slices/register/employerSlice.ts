// import apiClient from "@/lib/axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Step 1: Account credentials
export interface RegisterEmployerStep1Data {
  email: string;
  password: string;
}

// Step 2: Company information
export interface RegisterEmployerStep2Data {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  industry: string;
  regions: string;
  numberOfEmployees: string;
  branchOffices: string[];
  appealPoints: string;
  fee: string;
}

// Step 3: Contact person details
export interface RegisterEmployerStep3Data {
  name: string;
  departmentName: string;
  phoneNumber: string;
  emailAddress: string;
}

// Step 4: Agreement checkboxes
export interface RegisterEmployerStep4Data {
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  acceptReceiveEmails: boolean;
}

// All employer data
interface RegisterEmployerData {
  accountInfo: RegisterEmployerStep1Data;
  employerInfo: RegisterEmployerStep2Data;
  contactPerson: RegisterEmployerStep3Data;
  termsAndConditions: RegisterEmployerStep4Data;
}

// Main state interface for employer registration
export interface RegisterEmployer {
  currentStep: 1 | 2 | 3 | 4; // Current registration step (1-4)
  registerEmployerData: RegisterEmployerData;
  isLoading: boolean;
  isError: boolean;
}

const initialState: RegisterEmployer = {
  currentStep: 1,
  registerEmployerData: {
    accountInfo: {
      email: "",
      password: "",
    },
    employerInfo: {
      companyName: "",
      companyAddress: "",
      phoneNumber: "",
      industry: "",
      regions: "",
      numberOfEmployees: "",
      branchOffices: [],
      appealPoints: "",
      fee: "",
    },
    contactPerson: {
      name: "",
      departmentName: "",
      phoneNumber: "",
      emailAddress: "",
    },
    termsAndConditions: {
      acceptTerms: false,
      acceptPrivacyPolicy: false,
      acceptReceiveEmails: false,
    },
  },
  isLoading: false,
  isError: false,
};

export const registerEmployerSubmit = createAsyncThunk<
  void,
  void,
  { state: { registerEmployer: RegisterEmployer } }
>("registerEmployer/Submit", async (_, { getState, rejectWithValue }) => {
  const state = getState().registerEmployer;
  const data = state.registerEmployerData;

  const submissionData = {
    accountInfo: data.accountInfo,
    employerInfo: data.employerInfo,
    contactPerson: data.contactPerson,
    termsAndConditions: data.termsAndConditions,
  };

  try {
    // Simulate API call (remove when backend is ready)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Employer Registration Data:", submissionData);
    return;

    // Uncomment when backend is ready
    // const response = await apiClient.post(
    //   "http://localhost:8000/api/register/employer",
    //   submissionData
    // );
    // if (response.status === 200 || response.status === 201) {
    //   return;
    // }
    // throw new Error("Unexpected response status");
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Server responded with error status
      if (error.response) {
        const message = error.response.data?.message || "Registration failed";
        return rejectWithValue(message);
      }
      // Network error (no response)
      if (error.request) {
        return rejectWithValue("Network error. Please check your connection.");
      }
    }
    // Generic error fallback
    return rejectWithValue("An unexpected error occurred. Please try again.");
  }
});

export const registerEmployerSlice = createSlice({
  name: "registerEmployer",
  initialState,
  reducers: {
    // Reducers for navigating Registration Step State
    goNextStep: (
      state,
      action: PayloadAction<RegisterEmployer["currentStep"]>
    ) => {
      state.currentStep = action.payload;
    },
    goBack: (state) => {
      switch (state.currentStep) {
        case 4:
          state.currentStep = 3;
          break;
        case 3:
          state.currentStep = 2;
          break;
        case 2:
          state.currentStep = 1;
          break;
      }
    },
    // Save data to state
    saveRegEmployerStep1: (
      state,
      action: PayloadAction<RegisterEmployerStep1Data>
    ) => {
      state.registerEmployerData.accountInfo = action.payload;
    },
    saveRegEmployerStep2: (
      state,
      action: PayloadAction<RegisterEmployerStep2Data>
    ) => {
      state.registerEmployerData.employerInfo = action.payload;
    },
    saveRegEmployerStep3: (
      state,
      action: PayloadAction<RegisterEmployerStep3Data>
    ) => {
      state.registerEmployerData.contactPerson = action.payload;
    },
    saveRegEmployerStep4: (
      state,
      action: PayloadAction<RegisterEmployerStep4Data>
    ) => {
      state.registerEmployerData.termsAndConditions = action.payload;
    },

    // Clear State
    clearRegisterEmployerState: (state) => {
      state.currentStep = 1;
      state.registerEmployerData = initialState.registerEmployerData;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(registerEmployerSubmit.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      // Handle successful submission
      .addCase(registerEmployerSubmit.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        // Reset data and close modal after successful submission
        state.registerEmployerData = initialState.registerEmployerData;
        state.currentStep = 1;
      })
      // Handle failed submission
      .addCase(registerEmployerSubmit.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  goNextStep,
  goBack,
  saveRegEmployerStep1,
  saveRegEmployerStep2,
  saveRegEmployerStep3,
  saveRegEmployerStep4,
  clearRegisterEmployerState,
} = registerEmployerSlice.actions;
export default registerEmployerSlice.reducer;
