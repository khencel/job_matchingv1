import { configureStore } from "@reduxjs/toolkit";
import registerEmployerReducer from "./slices/register/employer/employerSlice";
import registerSuperVisoryReducer from "./slices/register/super-visory/superVisorySlice";
import registerJobSeekerReducer from "./slices/register/job-seeker/jobseekerSlice";
import resumeBuilderReducer from "./slices/resumeSlice";
import authReducer from "./slices/login/authSlice";
import basicInfoSlice from "./slices/employer/post_a_job/basicInfoSlice";
import jobListing from "./slices/employer/post_a_job/JobListing";
import profileSlice from "./slices/profile/profileSlice"
import perksAndBenefitsSlice from "./slices/perks_benefits/perksBenefitsSlice";



export const makeStore = () => {
  return configureStore({
    reducer: {
      authState: authReducer,
      registerEmployer: registerEmployerReducer,
      registerSuperVisory: registerSuperVisoryReducer,
      registerJobSeeker: registerJobSeekerReducer,
      resumeBuilder: resumeBuilderReducer,
      basicInfo: basicInfoSlice,
      jobListing: jobListing,
      profileSlice: profileSlice,
      perksAndBenefitsSlice: perksAndBenefitsSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
