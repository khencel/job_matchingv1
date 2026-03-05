import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createJobPost, updateJobPost } from "@/redux/features/job_post/job_post_thunk";
import Cookies from "js-cookie";

export interface Benefit {
  id: string;
  title: string;
  description: string
}

export interface PostBasicInfoState {
    title: string;
    salary: number | null;
    type_of_emp: Array<string>;
    category?: {value: string; label: string}[];
    skill: string[];
    job_desc?: string;
    responsibility?: string;
    who_you_are?: string;
    nice_to_have?: string;
    status?: "idle" | "loading" | "succeeded" | "failed";
    benefits: Benefit[];
    region?: string;
    company?: number;
    company_name?: string;
}

const initialState: PostBasicInfoState = {
    title: "",
    salary: null,
    type_of_emp: [],
    category: [],
    skill: [],
    job_desc: "",
    responsibility: "",
    who_you_are: "",
    nice_to_have: "",
    status: "idle",
    benefits:[],
    region: "",
    company: undefined,
    company_name: ""
};

export interface UpdateJobPostPayload {
  id: number;
  title: string;
  salary: number | null;
  type_of_emp: string[];
  category?: { value: string; label: string }[];
  job_desc?: string;
  responsibility?: string;
  who_you_are?: string;
  nice_to_have?: string;
  skill: string[];
  region?: string;
}


const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState,
    reducers: {
      setField: (state, action: PayloadAction<Partial<PostBasicInfoState>>) => {
        return { ...state, ...action.payload };
      },
      resetForm: () => initialState,

      addSkill: (state, action: PayloadAction<string>) => {
        if (!state.skill.includes(action.payload)) {
          state.skill.push(action.payload);
        }
      },
      removeSkill: (state, action: PayloadAction<string>) => {
        state.skill = state.skill.filter(skill => skill !== action.payload);
      },
      setInitialData: (state, action: PayloadAction<PostBasicInfoState>) => {
        localStorage.setItem("initialData", JSON.stringify(action.payload));
        return { ...state, ...action.payload };
      },

      addBenefit: (state, action: PayloadAction<Benefit>) => {
          state.benefits.push(action.payload)
      },

      removeBenefit: (state, action: PayloadAction<string>) => {
        state.benefits = state.benefits.filter(
          benefit => benefit.id !== action.payload
        )
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createJobPost.pending, state => { state.status = "loading"} )
        .addCase(createJobPost.fulfilled, state => { state.status = "succeeded"} )
        .addCase(createJobPost.rejected, state => { state.status = "failed"} )

      builder
        .addCase(updateJobPost.pending, state => { state.status = "loading"} )
        .addCase(updateJobPost.fulfilled, state => {
          state.status = "succeeded";
        })
        .addCase(updateJobPost.rejected, state => { state.status = "failed"} )
    }
});

export const { setField, addSkill, removeSkill, resetForm, setInitialData, addBenefit, removeBenefit } = basicInfoSlice.actions;
export default basicInfoSlice.reducer;