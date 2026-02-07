import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { moviesReducer } from "./slices/moviesSlice";
import { moviesSaga } from "./moviesSaga";
import { filterReducer } from "./slices/FilterSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(moviesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
