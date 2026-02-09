import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { getMoviesRequested } from "../../../redux-saga/slices/moviesSlice";
import { FilterType } from "../types/FilterType";
import { AppDispatch, RootState } from "../../../redux-saga/store";
import { MovieSearch } from "../components/movieSerch";
import { MoviesGrid } from "../components/movieGrid";
import { FilterButton } from "../components/filterButton";
import { useKeyboardNavigationMoviePage } from "../hooks/useKeyboardNavigationMoviePage";

export const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { page, totalResults } = useSelector(
    (state: RootState) => state.movies,
  );
  const filter = useSelector((state: RootState) => state.filter.filter);

  const headerRef = useRef<HTMLElement>(null!);
  const gridRef = useRef<HTMLDivElement>(null!);
  const paginationRef = useRef<HTMLDivElement>(null!);

  useKeyboardNavigationMoviePage({
    headerRef,
    gridRef,
    paginationRef,
    gridColumns: 4,
  });

  useEffect(() => {
    if (filter === FilterType.Search || filter === FilterType.favorites) return;
    dispatch(
      getMoviesRequested({
        filter: filter,
        page: 1,
      }),
    );
  }, [filter, dispatch]);

  return (
    <div className="min-h-screen" style={{ overflow: "hidden" }}>
      <header
        ref={headerRef}
        className="fixed top-5 left-1/2 -translate-x-1/2 w-[45rem] z-50 flex items-center space-x-4"
      >
        <MovieSearch data-header-element="true" />

        <FilterButton
          data-header-element="true"
          buttonFilter={FilterType.Popular}
          label="Popular"
        />

        <FilterButton
          data-header-element="true"
          buttonFilter={FilterType.AiringNow}
          label="Airing Now"
        />

        <FilterButton
          data-header-element="true"
          buttonFilter={FilterType.favorites}
          label="Favorites"
        />
      </header>

      <main
        className="pt-24 px-6"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <MoviesGrid gridRef={gridRef} />

        <div ref={paginationRef} className="flex justify-center mt-8">
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
