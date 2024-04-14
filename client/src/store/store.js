import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authApi";
import authReducer from "./slices/authSlice";
import { usersApi } from "./services/usersApi";
import { quizApi } from "./services/quizApi";
import { textApi } from "./services/textApi";
import { readingApi } from "./services/readingApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [textApi.reducerPath]: textApi.reducer,
    [readingApi.reducerPath]: readingApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      authApi.middleware,
      usersApi.middleware,
      quizApi.middleware,
      textApi.middleware,
      readingApi.middleware,
    ]);
  },
});

export default store;
