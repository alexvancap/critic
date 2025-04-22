import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';


// create store with defaults with imported reducer
export const store = configureStore({
  reducer: {
    // user will be the namespace in the state
    user: userReducer,
  },
});