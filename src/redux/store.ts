import { configureStore } from "@reduxjs/toolkit";
import registerEmployerReducer from "./slices/register/employerSlice";
import registerSuperVisoryReducer from "./slices/register/superVisorySlice";
import registerJobSeekerReducer from "./slices/register/jobseekerSlice";
import basicInfoSlice from "./slices/employer/post_a_job/basicInfoSlice";
import jobListing from "./slices/employer/post_a_job/JobListing"


export const makeStore = () => {
  return configureStore({
    reducer: {
      registerEmployer: registerEmployerReducer,
      registerSuperVisory: registerSuperVisoryReducer,
      registerJobSeeker: registerJobSeekerReducer,
      basicInfo: basicInfoSlice,
      jobListing: jobListing,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
