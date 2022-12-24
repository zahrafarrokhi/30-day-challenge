
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { authSlice } from './slices/auth';


const makeStore = (initialState) => {

  const combinedReducers = combineReducers({
  //auth example
   authReducer: authSlice.reducer,
  
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
  const store = configureStore({ reducer: rootReducer, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });

  return store
}


export const wrapper = createWrapper(makeStore, { storeKey: 'key' });