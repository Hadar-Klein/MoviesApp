import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { Movie } from "../../features/movies/types/movie";
import { loadFavorites } from "../../features/movies/localStorage/favoriteMoviesStorage";

interface favoriteMoviesState {
  favoriteMovies: Movie[];
}

const initialState: favoriteMoviesState = {
  favoriteMovies: loadFavorites(),
};

export const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.favoriteMovies = action.payload;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload,
      );
    },
  },
});

export const { addMovie, removeMovie, setFavorites} = favoriteMoviesSlice.actions;

export const favoriteMoviesReducer = favoriteMoviesSlice.reducer;
export const selectFavoriteMovies = (
  state: ReturnType<typeof store.getState>,
) => state.favoriteMovies.favoriteMovies;
