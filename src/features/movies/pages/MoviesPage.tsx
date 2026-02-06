import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMoviesRequested } from "../../../redux-saga/slices/moviesSlice";
import { FilterType } from "../types/FilterType";
import { AppDispatch } from "../../../redux-saga/store";
import { MovieSearch } from "../components/movieSerch";
import { MoviesGrid } from "../components/movieGrid";

export const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMoviesRequested(FilterType.Popular));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <header className="fixed top-5 w-[45rem] h-10 z-50 ">
        <MovieSearch />
      </header>

      <main className="pt-20 px-6">
        <MoviesGrid />
      </main>
    </div>
  );
};
