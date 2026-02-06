import { Movie } from "../features/movies/types/movie";

export function mapToMovies(results: any[]): Movie[] {
  return results.map((item) => ({
    id: item.id,
    title: item.name || item.original_name || item.title,
    overview: item.overview,
    posterUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    backdropPath: `https://image.tmdb.org/t/p/w780${item.backdrop_path}`,
    rating: item.vote_average,
  }));
}
