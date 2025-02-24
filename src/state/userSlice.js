import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  reducers: {
    example: (state) => {
      state.value = 'example';
    },
  },
});

export const { example } = counterSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;