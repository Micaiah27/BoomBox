import { all } from 'redux-saga/effects';
import songSaga from './sagas/songSaga';
import authSaga from './sagas/authSaga';

export default function* rootSaga() {
  yield all([
    songSaga(),
    authSaga()
  ]);
}
