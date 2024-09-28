import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // Use status instead of loading
    error: null,
  },
  reducers: {
    REGISTER_USER: (state) => {
      state.status = 'loading'; // Update status to loading
      state.error = null;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded'; // Update status to succeeded
    },
    REGISTER_USER_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; // Update status to failed
    },
    LOGIN_USER: (state) => {
      state.status = 'loading'; // Update status to loading
      state.error = null;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded'; // Update status to succeeded
    },
    LOGIN_USER_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; // Update status to failed
    },
    LOGOUT_USER: (state) => {
      state.status = 'loading'; // Update status to loading
      state.error = null;
    },
    LOGOUT_USER_SUCCESS: (state) => {
      state.user = null;
      state.status = 'succeeded'; // Update status to succeeded
    },
    LOGOUT_USER_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; // Update status to failed
    },
  },
});

export const {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} = authSlice.actions;

export default authSlice.reducer;
