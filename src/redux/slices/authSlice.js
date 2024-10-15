import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    REGISTER_USER: (state) => {
      state.status = 'loading'; 
      state.error = null;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded'; 
    },
    REGISTER_USER_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; 
    },
    LOGIN_USER: (state) => {
      state.status = 'loading'; 
      state.error = null;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
      state.status = 'succeeded'; 
    },
    LOGIN_USER_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; 
    },
    GITHUB_LOGIN: (state) => {
      state.status = 'loading'; 
      state.error = null;
    },
    GITHUB_LOGIN_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded'; 
    },
    GITHUB_LOGIN_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; 
    },
    LOGOUT_USER: (state) => {
      state.status = 'loading'; 
      state.error = null;
    },
    LOGOUT_USER_SUCCESS: (state) => {
      state.user = null;
      state.status = 'succeeded'; 
    },
    LOGOUT_USER_FAILURE: (state, action) => {
      state.error = action.payload;
      state.status = 'failed'; 
    },
    RESET_ERROR: (state) => {
      state.error = null; 
    },
  },
});

export const {
  REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,
  LOGIN_USER,LOGIN_USER_SUCCESS,LOGIN_USER_FAILURE,
  GITHUB_LOGIN, GITHUB_LOGIN_SUCCESS, GITHUB_LOGIN_FALIURE, 
  LOGOUT_USER,LOGOUT_USER_SUCCESS,LOGOUT_USER_FAILURE,
  RESET_ERROR
} = authSlice.actions;

export default authSlice.reducer;
