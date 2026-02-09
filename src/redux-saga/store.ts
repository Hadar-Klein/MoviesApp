import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { moviesReducer } from "./slices/moviesSlice";
import { filterReducer } from "./slices/FilterSlice";
import { favoriteMoviesReducer } from "./slices/favoriteMoviesSlice";
import { rootSaga } from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filter: filterReducer,
    favoriteMovies: favoriteMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
