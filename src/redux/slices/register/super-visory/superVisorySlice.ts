import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editSuperVisoryThunk } from "./superVisoryThunk";
import { RegistrationStep1 } from "@/types/user-register";
import {
  RegisterSuperVisory,
  RegisterSuperVisoryStep2Data,
  RegisterSuperVisoryStep3Data,
  RegisterSuperVisoryStep4Data,
} from "@/types/super-visory";
import { isEmailExistThunk, registerThunk } from "../registerThunk";

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
      action: PayloadAction<RegisterSuperVisory["currentStep"]>,
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
      action: PayloadAction<RegistrationStep1>,
    ) => {
      state.registerSuperVisoryData.accountInfo = action.payload;
    },
    saveRegSuperVisoryStep2: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep2Data>,
    ) => {
      state.registerSuperVisoryData.companyInfo = action.payload;
    },
    saveRegSuperVisoryStep3: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep3Data>,
    ) => {
      state.registerSuperVisoryData.contactPersonInfo = action.payload;
    },
    saveRegSuperVisoryStep4: (
      state,
      action: PayloadAction<RegisterSuperVisoryStep4Data>,
    ) => {
      state.registerSuperVisoryData.termsAndConditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    // register supervisory account
    builder.addAsyncThunk(registerThunk, {
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
