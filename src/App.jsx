import "./App.css";
import MovieSeatBookPage from "./pages/movieSeatBook/MovieSeatBookPage";
import AdminMoviesPage from "./pages/adminMovies/AdminMoviesPage";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./router/RouterApp";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RouterApp />
      </BrowserRouter>
    </>
  );
}

export default App;
