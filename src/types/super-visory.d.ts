import { RegistrationStep1 } from "./user-register";

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
  industry: string[];
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
