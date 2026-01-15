import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  editSuperVisoryThunk,
  isEmailExistThunk,
  registerSuperVisoryThunk,
} from "./superVisoryThunk";

export interface RegistrationStep1 {
  email: string;
  password: string;
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
  numOfEmployees: number | null;
  industry: string;
  yearFounded: number | null;
  capital: number | null;
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
  accountInfo: RegistrationStep1;
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
      numOfEmployees: null,
      industry: "",
      yearFounded: null,
      capital: null,
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

export const registerSuperVisorySlice = createSlice({
  name: "registerSuperVisory",
  initialState,
  reducers: {
    //open modal depending on currentStep
    goNextStep: (
      state,
      action: PayloadAction<RegisterSuperVisory["currentStep"]>
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
    clearRegisterSuperVisoryState: (state) => {
      state.currentStep = 1;
      state.registerSuperVisoryData = initialState.registerSuperVisoryData;
      state.isLoading = false;
      state.isError = false;
    },
    // save data to state reducers for each step
    saveRegSuperVisoryStep1: (
      state,
      action: PayloadAction<RegistrationStep1>
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
    // register supervisory account
    builder.addAsyncThunk(registerSuperVisoryThunk, {
      pending: (state) => {
        state.isLoading = true;
        state.isError = false;
      },
      fulfilled: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.registerSuperVisoryData = initialState.registerSuperVisoryData;
        state.currentStep = 1;
      },
      rejected: (state) => {
        state.isError = true;
        state.isLoading = false;
      },
    });
    // edit supervisory account
    builder.addAsyncThunk(editSuperVisoryThunk, {
      pending: (state) => {
        state.isLoading = true;
        state.isError = false;
      },
      fulfilled: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.registerSuperVisoryData = initialState.registerSuperVisoryData;
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
  goBack,
  clearRegisterSuperVisoryState,
  saveRegSuperVisoryStep1,
  saveRegSuperVisoryStep2,
  saveRegSuperVisoryStep3,
  saveRegSuperVisoryStep4,
} = registerSuperVisorySlice.actions;
export default registerSuperVisorySlice.reducer;
