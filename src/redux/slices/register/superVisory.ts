import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface RegisterSuperVisoryStep1Props {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface RegisterSuperVisoryStep2Data {
  companyName: string;
  companyNamePhonetic: string;
  repName: string;
  hqAddress: {
    prefecture: string;
    city: string;
    street: string;
  };
  numOfEmployees: number;
  industry: string;
  yearFounded: number;
  capital: number;
  businessDescription: string;
}

export interface RegisterSuperVisoryStep3Data {
  name: string;
  department: string;
  phoneNumber: string;
  email: string;
}

export interface RegisterSuperVisoryStep4Data {
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  acceptReceiveEmails: boolean;
}

export interface RegisterSuperVisoryData {
  accountInfo: RegisterSuperVisoryStep1Props;
  companyInfo: RegisterSuperVisoryStep2Data;
  contactPersonInfo: RegisterSuperVisoryStep3Data;
  termsAndConditions: RegisterSuperVisoryStep4Data;
}

export interface RegisterSuperVisory {
  currentStep: 1 | 2 | 3 | 4;
  registerSuperVisoryData: RegisterSuperVisoryData;
  isLoading: boolean;
  isError: boolean;
}

const initialState: RegisterSuperVisory = {
  currentStep: 1,
  registerSuperVisoryData: {
    accountInfo: {
      email: "",
      password: "",
      phoneNumber: "",
    },
    companyInfo: {
      companyName: "",
      companyNamePhonetic: "",
      repName: "",
      hqAddress: {
        prefecture: "",
        city: "",
        street: "",
      },
      numOfEmployees: 0,
      industry: "",
      yearFounded: 0,
      capital: 0,
      businessDescription: "",
    },
    contactPersonInfo: {
      name: "",
      department: "",
      phoneNumber: "",
      email: "",
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

export const registerJobSeekerSubmit = createAsyncThunk<
  void,
  void,
  { state: { registerSuperVisory: RegisterSuperVisory } }
>("registerSuperVisory/Submit", async (_, { getState, rejectWithValue }) => {
  const state = getState().registerSuperVisory;
  const data = state.registerSuperVisoryData;

  const submissionData = {
    accountInfo: data.accountInfo,
    companyInfo: data.companyInfo,
    contactPersonInfo: data.contactPersonInfo,
    termsAndConditions: data.termsAndConditions,
  };

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Submitted SuperVisory Registration Data:", submissionData);
    return;

    // Uncomment when backend is ready
    // const response = await apiClient.post(
    //   "http://localhost:8000/api/register/supervisory",
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

export const registerJobSeekerSlice = createSlice({
  name: "registerJobSeeker",
  initialState,
  reducers: {
    //open modal depending on currentStep
    goNextStep: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
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
    // save data to state reducers for each step
    saveRegSuperVisoryStep1: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep1Props>
    ) => {
      state.registerSuperVisoryData.accountInfo = action.payload;
    },
    saveRegSuperVisoryStep2: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep2Data>
    ) => {
      state.registerSuperVisoryData.companyInfo = action.payload;
    },
    saveRegSuperVisoryStep3: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep3Data>
    ) => {
      state.registerSuperVisoryData.contactPersonInfo = action.payload;
    },
    saveRegSuperVisoryStep4: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep4Data>
    ) => {
      state.registerSuperVisoryData.termsAndConditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerJobSeekerSubmit.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerJobSeekerSubmit.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        //Reset state after successful submission
        state.registerSuperVisoryData = initialState.registerSuperVisoryData;
        state.currentStep = 1;
      })
      .addCase(registerJobSeekerSubmit.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  goNextStep,
  goBack,
  saveRegSuperVisoryStep1,
  saveRegSuperVisoryStep2,
  saveRegSuperVisoryStep3,
  saveRegSuperVisoryStep4,
} = registerJobSeekerSlice.actions;
export default registerJobSeekerSlice.reducer;
