import { Movie } from "../types/movie";

const FAVORITES_KEY = "favoriteMovies";

export const loadFavorites = (): Movie[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

export const saveFavorites = (movies: Movie[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};
