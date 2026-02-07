import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { getMoviesRequested } from "../../../redux-saga/slices/moviesSlice";
import { FilterType } from "../types/FilterType";
import { AppDispatch, RootState } from "../../../redux-saga/store";
import { MovieSearch } from "../components/movieSerch";
import { MoviesGrid } from "../components/movieGrid";
import { FilterButton } from "../components/filterButton";

export const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { page, totalResults } = useSelector(
    (state: RootState) => state.movies,
  );

  const filter = useSelector((state: RootState) => state.filter.filter);

  useEffect(() => {
    if (filter === FilterType.Search || filter === FilterType.favorites) return;
    dispatch(
      getMoviesRequested({
        filter: filter,
        page: 1,
      }),
    );
  }, [filter]);
  return (
    <div className="min-h-screen">
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[45rem] z-50 flex items-center space-x-4">
        <MovieSearch />
        <FilterButton buttonFilter={FilterType.Popular} label="Popular" />
        <FilterButton buttonFilter={FilterType.AiringNow} label="Airing Now" />
        <FilterButton buttonFilter={FilterType.favorites} label="Favorites" />
      </header>

      <main className="pt-24 px-6">
        <MoviesGrid />

        <div className="flex justify-center mt-8">
          {filter !== FilterType.Search && filter !== FilterType.favorites && (
            <Pagination
              current={page}
              total={totalResults}
              pageSize={20}
              onChange={(newPage) =>
                dispatch(
                  getMoviesRequested({
                    filter: filter,
                    page: newPage,
                  }),
                )
              }
            />
          )}
        </div>
      </main>
    </div>
  );
};
