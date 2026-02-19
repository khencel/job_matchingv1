import { RegistrationStep1 } from "./user-register";

export interface RegisterEmployerStep2Data {
  name: string;
  phone: string;
  region: string;
  address: string;
  founded: number;
  profile: string;
  no_of_emp: number;
  appeal_point: string;
  branch_office: string[];
  company_industry: string[];
}

// Step 3: Contact person details
export interface RegisterEmployerStep3Data {
  name: string;
  email: string;
  phone: string;
  department_name: string;
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
  company_information: RegisterEmployerStep2Data;
  contact_person: RegisterEmployerStep3Data;
  accept_terms: boolean;
  accept_privacy: boolean;
  receive_email: boolean;
}

// Main state interface for employer registration
export interface RegisterEmployer {
  currentStep: 1 | 2 | 3 | 4; // Current registration step (1-4)
  registerEmployerData: RegisterEmployerData;
  isLoading: boolean;
  isError: boolean;
}
