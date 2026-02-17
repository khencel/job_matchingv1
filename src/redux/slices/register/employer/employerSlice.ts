// import apiClient from "@/lib/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RegisterEmployer,
  RegisterEmployerStep2Data,
  RegisterEmployerStep3Data,
} from "@/types/employer";
import { RegistrationStep1 } from "@/types/user-register";
import { registerThunk } from "../registerThunk";

const initialState: RegisterEmployer = {
  currentStep: 1,
  registerEmployerData: {
    accountInfo: {
      email: "",
      password: "",
    },
    company_information: {
      name: "",
      address: "",
      phone: "",
      company_industry: [],
      region: "",
      no_of_emp: 0,
      branch_office: [],
      appeal_point: 0,
      founded: 0,
      profile: "",
    },
    contact_person: {
      name: "",
      department_name: "",
      phone: "",
      email: "",
    },
    accept_terms: false,
    accept_privacy: false,
    receive_email: false,
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
      state.registerEmployerData.company_information = action.payload;
    },
    saveRegEmployerStep3: (
      state,
      action: PayloadAction<RegisterEmployerStep3Data>,
    ) => {
      state.registerEmployerData.contact_person = action.payload;
    },
    saveRegEmployerStep4: (state, action) => {
      state.registerEmployerData.accept_terms = action.payload.accept_terms;
      state.registerEmployerData.accept_privacy = action.payload.accept_privacy;
      state.registerEmployerData.receive_email = action.payload.receive_email;
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
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.registerEmployerData = initialState.registerEmployerData;
        state.currentStep = 1;
      })
      .addCase(registerThunk.rejected, (state) => {
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
