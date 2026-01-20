// import apiClient from "@/lib/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEmailExistThunk, registerEmployerThunk } from "./employerThunk";
import {
  RegisterEmployer,
  RegisterEmployerStep2Data,
  RegisterEmployerStep3Data,
  RegisterEmployerStep4Data,
} from "@/types/employer";
import { RegistrationStep1 } from "@/types/user-register";

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
      action: PayloadAction<RegisterEmployer["currentStep"]>,
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
      action: PayloadAction<RegisterEmployerStep2Data>,
    ) => {
      state.registerEmployerData.employerInfo = action.payload;
    },
    saveRegEmployerStep3: (
      state,
      action: PayloadAction<RegisterEmployerStep3Data>,
    ) => {
      state.registerEmployerData.contactPerson = action.payload;
    },
    saveRegEmployerStep4: (
      state,
      action: PayloadAction<RegisterEmployerStep4Data>,
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
      .addCase(registerEmployerThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerEmployerThunk.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.registerEmployerData = initialState.registerEmployerData;
        state.currentStep = 1;
      })
      .addCase(registerEmployerThunk.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
    // check email if existing
    builder
      .addCase(isEmailExistThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(isEmailExistThunk.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(isEmailExistThunk.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
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
