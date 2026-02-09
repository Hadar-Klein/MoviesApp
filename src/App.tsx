import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MoviesPage } from "./features/movies/pages/MoviesPage";
import { MoviesDetailsPage } from "./features/movies/pages/MoviesDetailsPage";
import { store } from "./redux-saga/store";
import { Provider } from "react-redux";

function App() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  });

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<MoviesPage />} />
            <Route path="/movie/:_id" element={<MoviesDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
