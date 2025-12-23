import { configureStore } from "@reduxjs/toolkit";
import registerEmployerReducer from "./slices/register/employerSlice";
import registerSuperVisoryReducer from "./slices/register/superVisorySlice";
import registerJobSeekerReducer from "./slices/register/jobseekerSlice";
import resumeBuilderReducer from "./slices/resumeSlice";
import skillsSlice from "./slices/employer/post_a_job/skillsSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      registerEmployer: registerEmployerReducer,
      registerSuperVisory: registerSuperVisoryReducer,
      registerJobSeeker: registerJobSeekerReducer,
      skills: skillsSlice,
      resumeBuilder: resumeBuilderReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
