import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    //add the generated reducer as a top level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  //adding the middleware enable the cashing, invalidation, polling

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
