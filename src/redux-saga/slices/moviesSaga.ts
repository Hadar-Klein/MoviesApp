import { call, put, takeLatest } from "redux-saga/effects";
import {
  getMoviesFailed,
  getMoviesRequested,
  getMoviesSucceeded,
} from "./moviesSlice";
import { getMoviesRaw } from "../../services/api";
import { FilterType } from "../../features/movies/types/FilterType";
import { mapToMovies } from "../../utils/mappers";
import { Movie } from "../../features/movies/types/movie";
import { PayloadAction } from "@reduxjs/toolkit/react";

// function* fetchMoviesByFilter(filter: FilterType) {
//   try {
//     const data = yield call(getMoviesRaw, filter);
//     const movies: Movie[] = mapToMovies(data.results);
//     yield put(getMoviesSucceeded(movies));
//   } catch (error) {
//     yield put(getMoviesFailed("Failed to load movies"));
//   }
// }

export function* moviesSaga() {
  yield takeLatest(getMoviesRequested.type, fetchMoviesByFilter);
}

function* fetchMoviesByFilter(action: PayloadAction<FilterType>) {
  try {
    const filter = action.payload;

    const data = yield call(getMoviesRaw, filter);
    const movies: Movie[] = mapToMovies(data.results);

    yield put(getMoviesSucceeded(movies));
  } catch (error) {
    yield put(getMoviesFailed("Failed to load movies"));
  }
}
