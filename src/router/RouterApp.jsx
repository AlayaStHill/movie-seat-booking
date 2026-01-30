import { Routes, Route } from "react-router-dom";
import MovieSeatBookPage from "../pages/movieSeatBook/MovieSeatBookPage";
import AdminMoviesPage from "../pages/adminMovies/AdminMoviesPage";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieSeatBookPage />} />
      <Route path="/admin" element={<AdminMoviesPage />} />
    </Routes>
  );
}

export default RouterApp;
