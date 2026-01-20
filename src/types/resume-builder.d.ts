export interface ResumeBasicInfo {
  firstName: string;
  midName: string;
  lastName: string;
  birthday: string; // Format: YYYY-MM-DD
  gender: string;
  liveInJapan: boolean;
  nationality: string;
  status: string; // Marital status
  email: string;
  number: string;
  address: string;
  landmark: string;
  photoUrl?: string;
}
export interface ResumeEducation {
  primary: {
    schoolName: string;
    yearGraduated: string;
    isNotFinished: boolean;
  };
  secondary: {
    schoolName: string;
    yearGraduated: string;
    isNotFinished: boolean;
  };
  tertiary: {
    schoolName: string;
    yearGraduated: string;
    isNotFinished: boolean;
  };
}
export interface ResumeLanguage {
  japaneseLevel: string; // e.g., N2, N3
  readingLevel: string;
  writingLevel: string;
  speakingLevel: string;
  otherLanguages: string[];
}
export interface ResumeWorkExperience {
  industry: string;
  companyName: string;
  position: string;
  employmentType: string;
  dateStarted: string;
  dateEnded: string;
}

export interface ResumeBuilderData {
  resumeTab: "basic-info" | "education" | "lang-level" | "skills" | "work-xp";
  basicInfo: ResumeBasicInfo;
  education: ResumeEducation;
  language: ResumeLanguage;
  workExperience: ResumeWorkExperience[];
  isLoading?: boolean;
  error?: string | null;
  savedResumeId?: string | null;
  skills: string[];
}

interface SaveResumePayload {
  blob: Blob;
  fileName: string;
}
