import { all } from "redux-saga/effects";
import { moviesSaga } from "./movies.saga";
import { favoriteMoviesSaga } from "./favoriteMovies.saga";

export function* rootSaga() {
  yield all([
    moviesSaga(),
    favoriteMoviesSaga(),
  ]);
}
