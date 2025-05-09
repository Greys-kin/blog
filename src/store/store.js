import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../api/blog-api";
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});
