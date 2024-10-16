import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  FETCH_USER_SONGS, 
  FETCH_USER_SONGS_SUCCESS, 
  FETCH_USER_SONGS_FAILURE,
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
import {fetchSongsApi, createSongApi, updateSongApi, deleteSongApi} from '../../api/songApi'; 

// Function to fetch songs for the logged-in user
function* fetchSongs(action) {
  try {
    const response = yield call(fetchSongsApi, action.payload); 
    yield put(FETCH_USER_SONGS_SUCCESS(response));
  } catch (error) {
    yield put(FETCH_USER_SONGS_FAILURE(error.message));
  }
}

// Function to add a song
function* addSong(action) {
  try {
    const newSongWithId = action.payload;
    const response = yield call(createSongApi, newSongWithId); 
    yield put(ADD_SONG_SUCCESS(response));
  } catch (error) {
    yield put(ADD_SONG_FAILURE(error.message));
  }
}

// Function to update a song
function* updateSong(action) {
  try {
    const updatedSong = action.payload;
    const response = yield call(updateSongApi, updatedSong); 
    yield put(UPDATE_SONG_SUCCESS(response));
  } catch (error) {
    yield put(UPDATE_SONG_FAILURE(error.message));
  }
}

// Function to delete a song
function* deleteSong(action) {
  try {
    const song = action.payload;
    yield call(deleteSongApi, song); 
    yield put(DELETE_SONG_SUCCESS(action.payload));
  } catch (error) {
    yield put(DELETE_SONG_FAILURE(error.message));
  }
}

// Watcher saga for songs
function* songSaga() {
  yield takeEvery(FETCH_USER_SONGS, fetchSongs);
  yield takeEvery(ADD_SONG, addSong);
  yield takeEvery(UPDATE_SONG, updateSong);
  yield takeEvery(DELETE_SONG, deleteSong);
}

export default songSaga;
