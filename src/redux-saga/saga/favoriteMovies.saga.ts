import { call, put, select, takeEvery } from "redux-saga/effects";
import { Movie } from "../../features/movies/types/movie";
import { addMovie, removeMovie, selectFavoriteMovies, setFavorites } from "../slices/favoriteMoviesSlice";
import { loadFavorites, saveFavorites } from "../../features/movies/localStorage/favoriteMoviesStorage";
 
export function* loadFavoritesSaga() {
  const favorites = yield call(loadFavorites);
  yield put(setFavorites(favorites));
}

function* saveFavoritesSaga() {
  const movies: Movie[] = yield select(selectFavoriteMovies);
  yield call(saveFavorites, movies);
}

function* watchFavoriteChanges() {
  yield takeEvery(
    [addMovie.type, removeMovie.type],
    saveFavoritesSaga
  );
}

export function* favoriteMoviesSaga() {
  yield loadFavoritesSaga();  
  yield watchFavoriteChanges();
}