// import apiClient from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface RegisterJobSeekerStep1Data {
  nationality: string;
  gender: "male" | "female" | null;
  currentPlaceResidence: string;
  birthdate: string;
  visaStatus: "APPLIED" | "PENDING" | "REVIEWING" | "ISSUED" | "DENIED" | null;
  highestEducation:
    | "elementary"
    | "jr-highschool"
    | "sr-highschool"
    | "vocational"
    | "bachelorDegree"
    | "masterDegree"
    | "doctoralDegree"
    | null;
  japaneseLevel: "N5" | "N4" | "N3" | "N2" | "N1" | null;
  email: string;
  contactNo: string;
  facebook: string;
}

export interface RegisterJobSeekerStep3Data {
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  acceptReceiveEmails: boolean;
}

export interface RegisterJobSeekerData {
  accountInfo: RegisterJobSeekerStep1Data;
  idURL: string;
  termsAndConditions: RegisterJobSeekerStep3Data;
}

export interface RegisterJobSeeker {
  currentStep: 1 | 2 | 3;
  registerJobSeekerData: RegisterJobSeekerData;
  isLoading: boolean;
  isError: boolean;
}

const initialState: RegisterJobSeeker = {
  currentStep: 1,
  registerJobSeekerData: {
    accountInfo: {
      nationality: "",
      gender: null,
      currentPlaceResidence: "",
      birthdate: "",
      visaStatus: null,
      highestEducation: null,
      japaneseLevel: null,
      email: "",
      contactNo: "",
      facebook: "",
    },
    idURL: "",
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
  { state: { registerJobSeeker: RegisterJobSeeker } }
>("registerJobSeeker/Submit", async (_, { getState, rejectWithValue }) => {
  const state = getState().registerJobSeeker;
  const data = state.registerJobSeekerData;

  const submissionData = {
    accountInfo: data.accountInfo,
    idURL: data.idURL,
    termsAndCondition: data.termsAndConditions,
  };

  try {
    //Simulate API call (remove when backend is ready)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Employer Registration Data:", submissionData);
    return;

    // const response = await apiClient.post(
    //   "http://localhost:8000/api/register/jobSeeker",
    //   submissionData
    // );
    // if (response.status === 200 || response.status === 201) {
    //   return;
    // }
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
    goNextStep: (
      state,
      action: PayloadAction<RegisterJobSeeker["currentStep"]>
    ) => {
      state.currentStep = action.payload;
    },
    goBackJobSeeker: (state) => {
      switch (state.currentStep) {
        case 3:
          state.currentStep = 2;
          break;
        case 2:
          state.currentStep = 1;
      }
    },
    clearRegisterJobSeekerState: (state) => {
      state.currentStep = 1;
      state.registerJobSeekerData = initialState.registerJobSeekerData;
      state.isLoading = false;
      state.isError = false;
    },
    saveRegJobSeekerStep1: (
      state,
      action: PayloadAction<RegisterJobSeekerStep1Data>
    ) => {
      state.registerJobSeekerData.accountInfo = action.payload;
    },
    saveRegJobSeekerStep2: (
      state,
      action: PayloadAction<RegisterJobSeekerData["idURL"]>
    ) => {
      state.registerJobSeekerData.idURL = action.payload;
    },
    saveRegJobSeekerStep3: (
      state,
      action: PayloadAction<RegisterJobSeekerStep3Data>
    ) => {
      state.registerJobSeekerData.termsAndConditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(registerJobSeekerSubmit, {
      pending: (state) => {
        state.isLoading = true;
        state.isError = false;
      },
      fulfilled: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.registerJobSeekerData = initialState.registerJobSeekerData;
        state.currentStep = 1;
      },
      rejected: (state) => {
        state.isError = true;
        state.isLoading = false;
      },
    });
  },
});

export const {
  goNextStep,
  goBackJobSeeker,
  clearRegisterJobSeekerState,
  saveRegJobSeekerStep1,
  saveRegJobSeekerStep2,
  saveRegJobSeekerStep3,
} = registerJobSeekerSlice.actions;
export default registerJobSeekerSlice.reducer;
