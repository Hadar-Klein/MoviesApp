import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { Movie } from "../../features/movies/types/movie";
import { FilterType } from "../../features/movies/types/FilterType";

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalResults: number;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  page: 1,
  totalResults: 0,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesRequested(
      state,
      action: PayloadAction<{ filter: FilterType; page: number }>,
    ) {
      state.loading = true;
      state.error = null;
      state.page = action.payload.page;
    },
    searchRequested: (
      state,
      action: PayloadAction<{ query: string; page: number }>,
    ) => {
      state.loading = true;
      state.error = null;
      state.page = action.payload.page;
    },

    getMoviesSucceeded(
      state,
      action: PayloadAction<{ movies: Movie[]; totalResults: number }>,
    ) {
      state.loading = false;
      state.movies = action.payload.movies;
      state.totalResults = action.payload.totalResults;
    },
    getMoviesFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMoviesFailed,
  getMoviesSucceeded,
  getMoviesRequested,
  searchRequested,
} = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;

export const selectMovies = (state: ReturnType<typeof store.getState>) =>
  state.movies.movies;
