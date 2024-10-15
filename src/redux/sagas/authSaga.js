import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER,
  LOGIN_USER,
  GITHUB_LOGIN,
  LOGOUT_USER,
} from '../slices/authSlice';

import { registerUser, loginUser, logoutUser, githubSignIn } from '../../api/authApi'

// Worker Saga for user registration
function* register(action) {
  try {
    const { name, email, password } = action.payload;
    const user = yield call(registerUser, email, password, name); 
    yield put({ type: REGISTER_USER_SUCCESS, payload: user }); 
  } catch (error) {
    yield put({ type: REGISTER_USER_FAILURE, payload: error.message }); 
  }
}

// Worker Saga for user login
function* login(action) {
  try {
    console.log(action.payload)
    const { email, password } = action.payload;
    const session = yield call(loginUser, email, password); 
    yield put({ type: LOGIN_USER_SUCCESS, payload: session }); 
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, payload: error.message }); 
  }
}

// Worker Saga for GitHub sign-in
function* githubSignInSaga() {
  try {
    yield call(githubSignIn); 
  } catch (error) {
    console.error(error);
  }
}

// Worker Saga for user logout
function* logoutSaga(action) {
  try {
    
    const { sessionId } = action.payload; 
    yield call(logoutUser, sessionId); 
    yield put({ type: LOGOUT_USER_SUCCESS }); 
  } catch (error) {
    console.error(error); 
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest(REGISTER_USER.type, register); 
  yield takeLatest(LOGIN_USER.type, login);
  yield takeLatest(LOGOUT_USER.type, logoutSaga); 
  yield takeLatest(GITHUB_LOGIN, githubSignInSaga); 
}
