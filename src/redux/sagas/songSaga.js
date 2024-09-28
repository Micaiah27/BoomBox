import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  FETCH_SONGS, 
  FETCH_SONGS_SUCCESS, 
  FETCH_SONGS_FAILURE,
  ADD_SONG, 
  ADD_SONG_SUCCESS, 
  ADD_SONG_FAILURE,
  UPDATE_SONG,
  UPDATE_SONG_SUCCESS,
  UPDATE_SONG_FAILURE,
  DELETE_SONG,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
} from '../slices/songSlice';
import * as songApi from '../../api/songApi'; // Import the Song API

// Function to fetch songs
function* fetchSongs() {
  try {
    const response = yield call(songApi.fetchSongs); // Call the API function
    yield put(FETCH_SONGS_SUCCESS(response));
  } catch (error) {
    yield put(FETCH_SONGS_FAILURE(error.message));
  }
}

// Function to add a song
function* addSong(action) {
  try {
    const response = yield call(songApi.addSong, action.payload); // Call the API function
    yield put(ADD_SONG_SUCCESS(response));
  } catch (error) {
    yield put(ADD_SONG_FAILURE(error.message));
  }
}

// Function to update a song
function* updateSong(action) {
  try {
    const response = yield call(songApi.updateSong, action.payload.$id, action.payload); // Call the API function
    yield put(UPDATE_SONG_SUCCESS(response));
  } catch (error) {
    yield put(UPDATE_SONG_FAILURE(error.message));
  }
}

// Function to delete a song
function* deleteSong(action) {
  try {
    yield call(songApi.deleteSong, action.payload); // Call the API function
    yield put(DELETE_SONG_SUCCESS(action.payload));
  } catch (error) {
    yield put(DELETE_SONG_FAILURE(error.message));
  }
}

// Watcher saga for songs
function* songSaga() {
  yield takeEvery(FETCH_SONGS, fetchSongs);
  yield takeEvery(ADD_SONG, addSong);
  yield takeEvery(UPDATE_SONG, updateSong);
  yield takeEvery(DELETE_SONG, deleteSong);
}

export default songSaga;
