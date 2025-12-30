import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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
  otherLanguages: string;
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
}

interface SaveResumePayload {
  blob: Blob;
  fileName: string;
}

// Async Thunk for saving resume to database
export const saveResume = createAsyncThunk(
  "resumeBuilder/saveResume",
  async ({ blob, fileName }: SaveResumePayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("resume_file", blob, fileName);

      // MOCK endpoint
      // Axios detects FormData and sets the header automatically.
      // const response = await apiClient.post("backend-endpoint", formData); // -> Use apiClient for django backend
      const response = await axios.post("/mock-api/resume/upload", formData); // Mock API
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle Axios errors
      if (error instanceof AxiosError) {
        // Server responded with error status
        if (error.response) {
          const message =
            error.response.data?.message || "Uploading Resume Failed";
          return rejectWithValue(message);
        }
        // Network error (no response)
        if (error.request) {
          return rejectWithValue(
            "Network error. Please check your connection."
          );
        }
      }
      // Generic error fallback
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

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
    primary: { schoolName: "", yearGraduated: "", isNotFinished: false },
    secondary: { schoolName: "", yearGraduated: "", isNotFinished: false },
    tertiary: { schoolName: "", yearGraduated: "", isNotFinished: false },
  },
  language: {
    japaneseLevel: "",
    readingLevel: "",
    writingLevel: "",
    speakingLevel: "",
    otherLanguages: "",
  },
  workExperience: [],
  isLoading: false,
  error: null,
  savedResumeId: null,
};

export const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState,
  reducers: {
    // Navigate Resume builder tab
    goNextResumeTab: (
      state,
      action: PayloadAction<
        "basic-info" | "education" | "lang-level" | "skills" | "work-xp"
      >
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

    updateLanguage: (
      state,
      action: PayloadAction<Partial<typeof initialState.language>>
    ) => {
      state.language = { ...state.language, ...action.payload };
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
        employmentType: "",
        dateStarted: "",
        dateEnded: "",
      });
    },
    removeWorkExperience: (state, action: PayloadAction<number>) => {
      state.workExperience.splice(action.payload, 1);
    },

    // Reset error state
    clearError: (state) => {
      state.error = null;
    },
  },

  // Extra reducers for async thunk
  extraReducers: (builder) => {
    builder
      .addCase(saveResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveResume.fulfilled, (state, action) => {
        const savedResumeId = action.payload?.id || action.payload?.resumeId;
        return { ...initialState, savedResumeId, isLoading: false, error: null };
      })
      .addCase(saveResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  goNextResumeTab,
  updateBasicInfo,
  updateWorkExperience,
  updateEducation,
  updateLanguage,
  addWorkExperience,
  removeWorkExperience,
  clearError,
} = resumeBuilderSlice.actions;
export default resumeBuilderSlice.reducer;
