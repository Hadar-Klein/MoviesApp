import React from "react";
import { useLocation } from "react-router-dom";
import { Movie } from "../types/movie";

export const MoviesDetailsPage: React.FC = () => {
  const { state } = useLocation();
  const movie: Movie = state?.movie;

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
        <h1 className="text-4xl font-semibold text-left tracking-tight mb-4 text-white drop-shadow-md z-20">
          {movie.title}
        </h1>
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
