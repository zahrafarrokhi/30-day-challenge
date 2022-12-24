
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { authSlice } from './slices/auth';
import { taskSlice } from './slices/task';
import { persistStore } from 'redux-persist';

const makeStore = (initialState) => {

  const combinedReducers = combineReducers({
  //auth example
   authReducer: authSlice.reducer,
   taskReducer: taskSlice.reducer,
   

  
  });
  // reducer => get state & action => return new state
  const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    }
    // if not HYDRATE => return above reducers => combinedReducers
    return combinedReducers(state, action);
  };

  const isClient = typeof window !== 'undefined';
  let mainReducer = rootReducer

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducers = persistReducer(persistConfig, rootReducer); // Wrapper reducers: if incoming actions are persist actions, run persist commands otherwise use rootReducer to update the state
    mainReducer = persistedReducers
  }

  const store = configureStore({ reducer: mainReducer, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });

  if (isClient) {
    store.__PERSISTOR = persistStore(store);
  }

  return store
}


export const wrapper = createWrapper(makeStore, { storeKey: 'key' });