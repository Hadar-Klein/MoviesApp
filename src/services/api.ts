import axios from "axios";
import { FilterType } from "../features/movies/types/FilterType";

const API_BASE_URL = "https://api.themoviedb.org/3/movie";
const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export async function getMoviesRaw(filterType: FilterType) {
  const response = await axios.get(API_BASE_URL + `/${filterType}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}
