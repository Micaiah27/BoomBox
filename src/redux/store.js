// src/redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slices/authSlice';
import songReducer from './slices/songSlice';
import rootSaga from './rootSaga';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] ['songs']// Only persist the auth reducer
  // blacklist:  // Alternatively, specify reducers not to persist
};
const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  // ... other reducers
});
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable default thunk middleware
      serializableCheck: {
        // Ignore these action types for serializable checks
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
