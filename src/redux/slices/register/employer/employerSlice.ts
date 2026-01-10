// import apiClient from "@/lib/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationStep1 } from "../superVisorySlice";
import { isEmailExistThunk, registerEmployerThunk } from "./employerThunk";

// Step 2: Company information
export interface RegisterEmployerStep2Data {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  industries: string[];
  regions: string;
  numberOfEmployees: string;
  branchOffices: string[];
  appealPoints: number;
  fee: number;
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
  accountInfo: RegistrationStep1;
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
      industries: [],
      regions: "",
      numberOfEmployees: "",
      branchOffices: [],
      appealPoints: 0,
      fee: 0,
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
    saveRegEmployerStep1: (state, action: PayloadAction<RegistrationStep1>) => {
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
    builder.addAsyncThunk(registerEmployerThunk, {
      pending: (state) => {
        state.isLoading = true;
        state.isError = false;
      },
      fulfilled: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.registerEmployerData = initialState.registerEmployerData;
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
  saveRegEmployerStep1,
  saveRegEmployerStep2,
  saveRegEmployerStep3,
  saveRegEmployerStep4,
  clearRegisterEmployerState,
} = registerEmployerSlice.actions;
export default registerEmployerSlice.reducer;
