// import apiClient from "@/lib/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationStep1 } from "../superVisorySlice";
import { isEmailExistThunk, registerJobSeekerThunk } from "./jobSeekerThunk";

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
    // registering job seeker
    builder.addAsyncThunk(registerJobSeekerThunk, {
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
    // check email if existing
    builder.addAsyncThunk(isEmailExistThunk, {
      pending: (state) => {
        state.isLoading = true;
        state.isError = false;
      },
      fulfilled: (state) => {
        state.isError = false;
        state.isLoading = false;
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
