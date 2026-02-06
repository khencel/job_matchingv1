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
  termsAndConditions: RegisterJobSeekerStep4Data;
}

export interface RegisterJobSeeker {
  currentStep: 1 | 2 | 3 | 4;
  registerJobSeekerData: RegisterJobSeekerData;
  isLoading: boolean;
  isError: boolean;
}

export interface JobSeekerApproachInterface {
  // basic personal information
  basicInfo: {
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    japaneseLevel: "N5" | "N4" | "N3" | "N2" | "N1" | "any";
    phone: string;
    email: string;
    visaStatus:
      | "student"
      | "services"
      | "dependent"
      | "permanent"
      | "ssw"
      | "training"
      | "notSure";
  };
  // job preferences
  preferences: {
    preferredArea: string;
    preferredJobRole: string;
    preferredEmployment:
      | "full-time"
      | "part-time"
      | "contract"
      | "shift"
      | "dispatch";
    expectedSalary: string;
    futureGoals: string;
  };
  // current job details
  currentJob: {
    companyNameOrIndustry: string;
    currentPrefecture: string;
    jobDuties: string;
    jobChangeDate: string;
    reasonForLeaving: string;
  };
  // additional information
  additionalInfo: {
    skills: string;
    dormPreference: "need" | "not-needed" | "flexible" | null;
    notes: string;
  };
}
