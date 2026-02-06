import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { Movie } from "../../features/movies/types/movie";
import { FilterType } from "../../features/movies/types/FilterType";

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesRequested(state, action: PayloadAction<FilterType>) {
      state.loading = true;
      state.error = null;
    },
    getMoviesSucceeded(state, action: PayloadAction<Movie[]>) {
      state.loading = false;
      state.movies = action.payload;
    },
    getMoviesFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getMoviesFailed, getMoviesSucceeded, getMoviesRequested } =
  moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;

export const selectMovies = (state: ReturnType<typeof store.getState>) =>
  state.movies.movies;
