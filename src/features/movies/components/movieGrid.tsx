import MovieCard from "../components/movieCard";
import { RootState } from "../../../redux-saga/store";
import { useSelector } from "react-redux";
import { FilterType } from "../types/FilterType";

export const MoviesGrid: React.FC = () => {
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies,
  );
  const { favoriteMovies } = useSelector(
    (state: RootState) => state.favoriteMovies,
  );
  const { filter } = useSelector((state: RootState) => state.filter);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      {filter == FilterType.favorites
        ? favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};
