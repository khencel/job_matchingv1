import { configureStore } from "@reduxjs/toolkit";
import registerEmployerReducer from "./slices/register/employerSlice";
import registerSuperVisoryReducer from "./slices/register/superVisorySlice";
import registerJobSeekerReducer from "./slices/register/jobSeekerSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      registerEmployer: registerEmployerReducer,
      registerSuperVisory: registerSuperVisoryReducer,
      registerJobSeeker: registerJobSeekerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
