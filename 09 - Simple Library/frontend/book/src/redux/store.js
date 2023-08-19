
// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/?utm_content=cmp-true
import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./slices /books";
import thunk from "redux-thunk";


// configureStore is func
export const store = configureStore({
  reducer: {
    bookReducer: bookSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk)
});
