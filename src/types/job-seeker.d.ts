import { RegistrationStep1 } from "./user-register";

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
