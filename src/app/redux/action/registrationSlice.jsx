// src/redux/registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: "/registration/job_seeker.jpg",   // default image
  title: "Job seeker registration"
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;  // <-- reducer updates image
    },
    setTitle: (state, action) => {
      state.title = action.payload;  // <-- reducer updates title
    }
  }
});

// Actions
export const { setImage, setTitle } = registrationSlice.actions;

// Reducer
export default registrationSlice.reducer;
