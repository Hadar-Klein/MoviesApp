import { call, put, takeLatest, throttle } from "redux-saga/effects";
import {
  getMoviesFailed,
  getMoviesRequested,
  getMoviesSucceeded,
  searchRequested,
} from "../slices/moviesSlice";
import { getMoviesRaw } from "../../services/api";
import { FilterType } from "../../features/movies/types/FilterType";
import { mapToMovies } from "../../utils/mappers";
import { Movie } from "../../features/movies/types/movie";
import { PayloadAction } from "@reduxjs/toolkit/react";

function* fetchMoviesByFilter(
  action: PayloadAction<{ filter: FilterType; page: number }>,
): Generator {
  try {
    console.log(action.payload);
    const filter = action.payload.filter;
    const page = action.payload.page;

    const data = yield call(getMoviesRaw, filter, page, undefined);
    const movies: Movie[] = mapToMovies(data.results);

    yield put(getMoviesSucceeded({ movies, totalResults: data.total_results }));
  } catch (error) {
    yield put(getMoviesFailed("Failed to load movies"));
  }
}

function* searchMovies(
  action: PayloadAction<{ query: string; page: number }>,
): Generator {
  const query = action.payload.query;
  const page = action.payload.page;
  try {
    const data = yield call(getMoviesRaw, FilterType.Search, page, query);
    const movies: Movie[] = mapToMovies(data.results);

    yield put(getMoviesSucceeded({ movies, totalResults: data.total_results }));
  } catch (error: any) {
    yield put(getMoviesFailed(error.message));
  }
}

export function* moviesSaga() {
  yield takeLatest(getMoviesRequested.type, fetchMoviesByFilter);
  yield throttle(2000, searchRequested.type, searchMovies);
}
