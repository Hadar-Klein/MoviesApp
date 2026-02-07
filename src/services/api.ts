import axios from "axios";
import { FilterType } from "../features/movies/types/FilterType";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export async function getMoviesRaw(
  filter: FilterType,
  page: number = 1,
  query?: string,
) {
  let url = "";
  if (filter === FilterType.Search && query) {
    url = API_BASE_URL + `${filter}/movie?query=${query}&page=${page}`;
    console.log("Constructed search URL:", url);
  } else {
    url = API_BASE_URL + `movie/${filter}?page=${page}`;
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}
