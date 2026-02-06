import MovieCard from "../components/movieCard";
import { RootState } from "../../../redux-saga/store";
import { useSelector } from "react-redux";

export const MoviesGrid: React.FC = () => {
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies,
  );

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
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
