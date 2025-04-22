import { createSlice } from '@reduxjs/toolkit';

// create slice bundles Initial State, Reducers, Action creators and Action Types

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  status: '', 
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = userSlice.actions;

export default userSlice.reducer;