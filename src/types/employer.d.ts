import { RegistrationStep1 } from "./user-register";

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
export interface RegisterEmployerData {
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
