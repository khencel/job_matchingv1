import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    isFinished: boolean;
  };
  secondary: {
    schoolName: string;
    yearGraduated: string;
    isFinished: boolean;
  };
  tertiary: {
    schoolName: string;
    yearGraduated: string;
    isFinished: boolean;
  };
}
export interface ResumeLanguage {
  japaneseLevel: string; // e.g., N2, N3
  readingLevel: string;
  writingLevel: string;
  speakingLevel: string;
  otherLanguages: string;
}
export interface ResumeWorkExperience {
  industry: string;
  companyName: string;
  position: string;
  dateStarted: string;
  dateEnded: string;
}

interface ResumeBuilderData {
  resumeTab: "basic-info" | "education" | "lang-level" | "skills" | "work-xp";
  basicInfo: ResumeBasicInfo;
  education: ResumeEducation;
  language: ResumeLanguage;
  workExperience: ResumeWorkExperience[];
}

const initialState: ResumeBuilderData = {
  resumeTab: "basic-info",
  basicInfo: {
    firstName: "",
    midName: "",
    lastName: "",
    birthday: "",
    gender: "",
    liveInJapan: false,
    nationality: "",
    status: "",
    email: "",
    number: "",
    address: "",
    landmark: "",
    photoUrl: "",
  },
  education: {
    primary: { schoolName: "", yearGraduated: "", isFinished: false },
    secondary: { schoolName: "", yearGraduated: "", isFinished: false },
    tertiary: { schoolName: "", yearGraduated: "", isFinished: false },
  },
  language: {
    japaneseLevel: "",
    readingLevel: "",
    writingLevel: "",
    speakingLevel: "",
    otherLanguages: "",
  },
  workExperience: [],
};

export const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState,
  reducers: {
    // Navigate Resume builder tab
    goNextResumeTab: (
      state,
      action: PayloadAction<ResumeBuilderData["resumeTab"]>
    ) => {
      state.resumeTab = action.payload;
    },
    // 1. Action to update flat objects (Basic Info)
    updateBasicInfo: (
      state,
      action: PayloadAction<Partial<typeof initialState.basicInfo>>
    ) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },

    updateEducation: (
      state,
      action: PayloadAction<Partial<typeof initialState.education>>
    ) => {
      state.education = { ...state.education, ...action.payload };
    },

    // 2. Action to update Arrays (Work Experience)
    // We need the index to know which job to update
    updateWorkExperience: (
      state,
      action: PayloadAction<{ index: number; field: string; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.workExperience[index]) {
        // @ts-expect-error - Dynamic key access
        state.workExperience[index][field] = value;
      }
    },

    // 3. Actions to Add/Remove items
    addWorkExperience: (state) => {
      state.workExperience.push({
        industry: "",
        companyName: "",
        position: "",
        dateStarted: "",
        dateEnded: "",
      });
    },
    removeWorkExperience: (state, action: PayloadAction<number>) => {
      state.workExperience.splice(action.payload, 1);
    },
  },
});

export const {
  updateBasicInfo,
  updateWorkExperience,
  updateEducation,
  addWorkExperience,
  removeWorkExperience,
} = resumeBuilderSlice.actions;
export default resumeBuilderSlice.reducer;
