import { createSlice } from '@reduxjs/toolkit';


export const songSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    loading: false,
    error: null,
  },
  reducers: {
    FETCH_USER_SONGS: (state) => {
      state.loading = true;
      state.error = null;
    },
    FETCH_USER_SONGS_SUCCESS: (state, action) => {
      state.songs = action.payload;
      state.loading = false;
    },
    FETCH_USER_SONGS_FAILURE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    ADD_SONG: (state) => {
      state.loading = true;
      state.error = null;
    },
    ADD_SONG_SUCCESS: (state, action) => {
      state.songs.push(action.payload);
      state.loading = false;
    },
    ADD_SONG_FAILURE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    UPDATE_SONG: (state) => {
      state.loading = true;
      state.error = null;
    },
    UPDATE_SONG_SUCCESS: (state, action) => {
      const index = state.songs.findIndex(song => song.$id === action.payload.$id);
      if (index !== -1) {
        state.songs[index] = action.payload;
        console.log(state.songs) // Update the song in the array
      }
      state.loading = false;
    },
    UPDATE_SONG_FAILURE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    DELETE_SONG: (state) => {
      state.loading = true;
      state.error = null;
    },
    DELETE_SONG_SUCCESS: (state, action) => {
      state.songs = state.songs.filter(song => song.$id !== action.payload);
      state.loading = false;
    },
    DELETE_SONG_FAILURE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  FETCH_USER_SONGS,FETCH_USER_SONGS_SUCCESS,FETCH_USER_SONGS_FAILURE,
  ADD_SONG,ADD_SONG_SUCCESS,ADD_SONG_FAILURE,
  UPDATE_SONG,UPDATE_SONG_SUCCESS,UPDATE_SONG_FAILURE,
  DELETE_SONG,DELETE_SONG_SUCCESS,DELETE_SONG_FAILURE,
} = songSlice.actions;


export default songSlice.reducer;
