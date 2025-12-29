// import apiClient from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RegistrationStep1 } from "./superVisorySlice";

export interface RegisterJobSeekerStep2Data {
  firstName: string;
  midName?: string;
  lastName: string;
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

export interface RegisterJobSeekerStep4Data {
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  acceptReceiveEmails: boolean;
}

export interface RegisterJobSeekerData {
  accountInfo: RegistrationStep1;
  jobSeekerData: RegisterJobSeekerStep2Data;
  idURL: string;
  termsAndConditions: RegisterJobSeekerStep4Data;
}

export interface RegisterJobSeeker {
  currentStep: 1 | 2 | 3 | 4;
  registerJobSeekerData: RegisterJobSeekerData;
  isLoading: boolean;
  isError: boolean;
}

const initialState: RegisterJobSeeker = {
  currentStep: 1,
  registerJobSeekerData: {
    accountInfo: {
      email: "",
      password: "",
    },
    jobSeekerData: {
      firstName: "",
      midName: "",
      lastName: "",
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
    jobSeekerData: data.jobSeekerData,
    idURL: data.idURL,
    termsAndCondition: data.termsAndConditions,
  };

  try {
    //Simulate API call (remove when backend is ready)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Job Seeker Registration Data:", submissionData);
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
        case 4:
          state.currentStep = 3;
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
      action: PayloadAction<RegistrationStep1>
    ) => {
      state.registerJobSeekerData.accountInfo = action.payload;
    },
    saveRegJobSeekerStep2: (
      state,
      action: PayloadAction<RegisterJobSeekerStep2Data>
    ) => {
      state.registerJobSeekerData.jobSeekerData = action.payload;
    },
    saveRegJobSeekerStep3: (
      state,
      action: PayloadAction<RegisterJobSeekerData["idURL"]>
    ) => {
      state.registerJobSeekerData.idURL = action.payload;
    },
    saveRegJobSeekerStep4: (
      state,
      action: PayloadAction<RegisterJobSeekerStep4Data>
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
  saveRegJobSeekerStep4,
} = registerJobSeekerSlice.actions;
export default registerJobSeekerSlice.reducer;
