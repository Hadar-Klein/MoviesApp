import { call, debounce, put, takeLatest, throttle } from "redux-saga/effects";
import {
  getMoviesFailed,
  getMoviesRequested,
  getMoviesSucceeded,
  searchRequested,
} from "./moviesSlice";
import { getMoviesRaw } from "../../services/api";
import { FilterType } from "../../features/movies/types/FilterType";
import { mapToMovies } from "../../utils/mappers";
import { Movie } from "../../features/movies/types/movie";
import { PayloadAction } from "@reduxjs/toolkit/react";


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

function* searchMovies(action: PayloadAction<string>) {
  const query = action.payload;
  try {
    const data = yield call(getMoviesRaw, FilterType.Search, query);
    const movies = mapToMovies(data.results);
    yield put(getMoviesSucceeded(movies));
  } catch (error: any) {
    yield put(getMoviesFailed(error.message));
  }
}

export function* moviesSaga() {
  yield takeLatest(getMoviesRequested.type, fetchMoviesByFilter);
  yield throttle(2000, searchRequested.type, searchMovies);
}
