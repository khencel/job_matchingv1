import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./action/registrationSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer
  }
});
