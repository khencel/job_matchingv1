import { configureStore } from "@reduxjs/toolkit";
import registerEmployerReducer from "./slices/register/employerSlice";
import registerSuperVisoryReducer from "./slices/register/superVisory";

export const makeStore = () => {
  return configureStore({
    reducer: {
      registerEmployer: registerEmployerReducer,
      registerSuperVisory: registerSuperVisoryReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
