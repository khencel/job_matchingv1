import { configureStore } from "@reduxjs/toolkit";
import registerEmployerReducer from "./slices/register/employer/employerSlice";
import registerSuperVisoryReducer from "./slices/register/super-visory/superVisorySlice";
import registerJobSeekerReducer from "./slices/register/job-seeker/jobseekerSlice";
import resumeBuilderReducer from "./slices/resumeSlice";
import authReducer from "./slices/login/authSlice";
import basicInfoSlice from "./slices/employer/post_a_job/basicInfoSlice";
import jobListing from "./slices/employer/post_a_job/JobListing";
import profileSlice from "./slices/profile/profileSlice";
import perksAndBenefitsSlice from "./slices/perks_benefits/perksBenefitsSlice";
import applicantReducer from "./slices/applicants/applicantSlice";
import applyJobSlice from "./slices/jobs/applyToJobSlice";
import appliedJobSlice from "./slices/jobs/appliedJobSlice";
import jobPostSlice from "./slices/jobs/jobPostSlice";
import updateProfileSlice from "./slices/updateProfile/updateProfileSlice";
import getAllUserByFilter from "./slices/applicants/userSlice";
import jobSeekerApplicant from "./slices/employer/applicants/jobSeekerApplicantSlice";


import publicProfileSlice from "./slices/publicProfileSlice";

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
      applicants: applicantReducer,
      jobSlice: applyJobSlice,
      appliedJob: appliedJobSlice,
      jobPost: jobPostSlice,
      updateProfile: updateProfileSlice,
      getAllUserByFilter: getAllUserByFilter,
      jobSeekerApplicant:jobSeekerApplicant,
      publicProfile: publicProfileSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
