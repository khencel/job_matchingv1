import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SkillsState {
  skills: string[];
}

const initialState: SkillsState = {
  skills: [],
};

const skillsSlice = createSlice({
  name:'skills',
  initialState,
  reducers:{
    addSkill:(state, action: PayloadAction<string>) => {
      if(!state.skills.includes(action.payload)){
        state.skills.push(action.payload);
      }
    },

    removeSkill:(state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(
        (skill) => skill !== action.payload
      );

    }
  }
})


export const {addSkill, removeSkill} = skillsSlice.actions;
export default skillsSlice.reducer;