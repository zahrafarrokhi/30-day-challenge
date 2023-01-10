
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { taskSlice } from './slices/task';


const makeStore = (initialState) => {

  const combinedReducers = combineReducers({
  //auth example
   taskReducer: taskSlice.reducer,
  
  });
  
  const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    }
    return combinedReducers(state, action);
  };
  const store = configureStore({ reducer: rootReducer, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });

  return store
}


export const wrapper = createWrapper(makeStore, { storeKey: 'key' });
