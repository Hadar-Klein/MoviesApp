import React from "react";
import { useLocation } from "react-router-dom";
import { Movie } from "../types/movie";
import { AppDispatch, RootState } from "../../../redux-saga/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  removeMovie,
} from "../../../redux-saga/slices/favoriteMoviesSlice";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMovieDetailsKeyboard } from "../hooks/useMovieDetailsKeyboard ";

export const MoviesDetailsPage: React.FC = () => {
  const { state } = useLocation();
  const movie: Movie = state?.movie;
  const dispatch = useDispatch<AppDispatch>();

  const favoriteMovies = useSelector(
    (state: RootState) => state.favoriteMovies.favoriteMovies,
  );

  const isFavorite = favoriteMovies.some((fav) => fav.id === movie?.id);

  const toggleFavorite = () => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
  };
  useMovieDetailsKeyboard({ toggleFavorite });

  return (
    <div>
      <img
        className="absolute top-[15%] right-[0] w-full h-[70%] opacity-50"
        src={movie?.backdropPath}
        alt="Movie Backdrop"
      />

      <div
        className="absolute top-[15%] right-[0] w-full h-[70%] opacity-50"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
      <div className="absolute top-[20%] left-[28%] w-[40%] text-white">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-md">
            {movie.title}
          </h1>

          <div
            onClick={toggleFavorite}
            className="border-none text-3xl text-red-500 cursor-pointer hover:scale-110 "
            aria-label="Toggle favorite"
          >
            {isFavorite ? <HeartFilled /> : <HeartOutlined />}
          </div>
        </div>
        <h3 className="text-3xl text-left z-20">overview</h3>
        <p className="text-base leading-relaxed text-left text-white z-20 drop-shadow-sm">
          {movie.overview}
        </p>
      </div>
      <img
        className="absolute top-[20%] left-[5%] w-1/5 h-3/5  rounded-lg border border-gray-300"
        src={movie?.posterUrl}
        alt="Movie poster"
      />
    </div>
  );
};
