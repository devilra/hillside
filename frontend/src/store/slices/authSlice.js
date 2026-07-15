import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('admin_token') || null,
  email: localStorage.getItem('admin_email') || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem('admin_token', action.payload.token);
      localStorage.setItem('admin_email', action.payload.email);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_email');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
