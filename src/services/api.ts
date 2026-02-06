import axios from "axios";
import { FilterType } from "../features/movies/types/FilterType";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export async function getMoviesRaw(filterType: FilterType, query?: string) {
  let url = "";
  if (filterType === FilterType.Search && query) {
    url = API_BASE_URL + `${filterType}/movie?query=${query}`;
  } else {
    url = API_BASE_URL + `movie/${filterType}`;
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}
