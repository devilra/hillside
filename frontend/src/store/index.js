import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import leadsReducer from './slices/leadsSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer
  }
});
