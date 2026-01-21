import apiClient from "@/lib/axios";
import { ResumeBuilderData, SaveResumePayload } from "@/types/resume-builder";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Async Thunk for saving resume to database
export const saveResume = createAsyncThunk(
  "resumeBuilder/saveResume",
  async (
    { user, resume_info, resume }: SaveResumePayload,
    { rejectWithValue },
  ) => {
    try {
      const submitData: SaveResumePayload = {
        user,
        resume_info,
        resume,
      };

      // Axios detects FormData and sets the header automatically.
      const response = await apiClient.post("resume/", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
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
            "Network error. Please check your connection.",
          );
        }
      }
      // Generic error fallback
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  },
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
    otherLanguages: [],
  },
  workExperience: [],
  isLoading: false,
  error: null,
  savedResumeId: null,
  skills: [],
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
      >,
    ) => {
      state.resumeTab = action.payload;
    },
    // 1. Action to update flat objects (Basic Info)
    updateBasicInfo: (
      state,
      action: PayloadAction<Partial<typeof initialState.basicInfo>>,
    ) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },

    updateEducation: (
      state,
      action: PayloadAction<Partial<typeof initialState.education>>,
    ) => {
      state.education = { ...state.education, ...action.payload };
    },

    updateLanguage: (
      state,
      action: PayloadAction<Partial<typeof initialState.language>>,
    ) => {
      state.language = { ...state.language, ...action.payload };
    },

    // 2. Action to update Arrays (Work Experience)
    // We need the index to know which job to update
    updateWorkExperience: (
      state,
      action: PayloadAction<{ index: number; field: string; value: string }>,
    ) => {
      const { index, field, value } = action.payload;
      if (state.workExperience[index]) {
        // @ts-expect-error - Dynamic key access
        state.workExperience[index][field] = value;
      }
    },

    //update Skills
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },

    addSkill: (state, action: PayloadAction<string>) => {
      if (action.payload.trim() !== "") {
        state.skills.push(action.payload.trim());
      }
    },

    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
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
      .addCase(saveResume.fulfilled, (_, action) => {
        const savedResumeId = action.payload?.id || action.payload?.resumeId;
        return {
          ...initialState,
          savedResumeId,
          isLoading: false,
          error: null,
        };
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
  updateSkills,
  addSkill,
  removeSkill,
  addWorkExperience,
  removeWorkExperience,
  clearError,
} = resumeBuilderSlice.actions;

// Selectors to validate completion of sections
export const isBasicInfoComplete = (state: ResumeBuilderData): boolean => {
  const { basicInfo } = state;
  return (
    basicInfo.firstName.trim() !== "" &&
    basicInfo.lastName.trim() !== "" &&
    basicInfo.birthday.trim() !== "" &&
    basicInfo.gender.trim() !== "" &&
    basicInfo.nationality.trim() !== "" &&
    basicInfo.status.trim() !== "" &&
    basicInfo.email.trim() !== "" &&
    basicInfo.number.trim() !== "" &&
    basicInfo.address.trim() !== ""
  );
};

export const isLanguageLevelComplete = (state: ResumeBuilderData): boolean => {
  const { language } = state;
  return (
    language.japaneseLevel.trim() !== "" &&
    language.readingLevel.trim() !== "" &&
    language.writingLevel.trim() !== "" &&
    language.speakingLevel.trim() !== ""
  );
};

export const canSaveResume = (state: ResumeBuilderData): boolean => {
  return isBasicInfoComplete(state);
};

export default resumeBuilderSlice.reducer;
