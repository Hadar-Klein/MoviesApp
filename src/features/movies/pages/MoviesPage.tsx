import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getPopularMoviesRequested } from "../../../redux-saga/slices/moviesSlice";

import MovieCard from "../components/movieCard";
import { getMoviesRequested } from "../../../redux-saga/slices/moviesSlice";
import { FilterType } from "../types/FilterType";
import { AppDispatch, RootState } from "../../../redux-saga/store";

export const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(getMoviesRequested(FilterType.Popular));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
