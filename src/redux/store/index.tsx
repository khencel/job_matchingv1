import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/login/authSlice";
import skillsReducer from "../slices/employer/post_a_job/skillsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
  },
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
