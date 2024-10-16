// src/redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slices/authSlice';
import songReducer from './slices/songSlice';
import rootSaga from './rootSaga';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] ['songs']
  
};
const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, 
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
