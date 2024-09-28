// frontend/src/features/auth/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
} from '../slices/authSlice';
import { registerUser, loginUser, logoutUser, githubSignIn } from '../../api/authApi';

// Worker Saga for user registration
function* register(action) {
  try {
    const { name, email, password } = action.payload;
    const user = yield call(registerUser, email, password, name); // Call the API for registration
    yield put({ type: REGISTER_USER_SUCCESS, payload: user }); // Dispatch success action
  } catch (error) {
    yield put({ type: REGISTER_USER_FAILURE, payload: error.message }); // Dispatch failure action with error message
  }
}

// Worker Saga for user login
function* login(action) {
  try {
    const { email, password } = action.payload;
    const session = yield call(loginUser, email, password); // Call the API for login
    yield put({ type: LOGIN_USER_SUCCESS, payload: session }); // Dispatch success action with session details
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, payload: error.message }); // Dispatch failure action with error message
  }
}

// Worker Saga for GitHub sign-in
function* githubSignInSaga() {
  try {
    yield call(githubSignIn); // Call the GitHub sign-in function
  } catch (error) {
    console.error(error);
  }
}

// Worker Saga for user logout
function* logoutSaga(action) {
  try {
    const { sessionId } = action.payload; // Extract sessionId from action
    yield call(logoutUser, sessionId); // Call the API to logout
    yield put({ type: LOGOUT_USER_SUCCESS }); // Dispatch logout action
  } catch (error) {
    console.error(error); // Handle error (optional)
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest('auth/register', register); // Listen for registration action
  yield takeLatest('auth/login', login); // Listen for login action
  yield takeLatest('auth/logout', logoutSaga); // Listen for logout action
  yield takeLatest('auth/githubSignIn', githubSignInSaga); // Listen for GitHub sign-in action
}
