import { useCallback } from "react";
import Movie from "../models/movie";

export const useMovies = () => {
  /* useCallback = loadMovies återanvänds vid varje render och skapas inte på nytt (stabil), 
     annars tror useEffect att något har ändrats och körs igen - loop */
  const loadMovies = useCallback(async () => {
    try {
      // anges ingen method är det GET - default
      const response = await fetch("http://localhost:3000/movies");

      if (!response.ok) {
        return [];
      }
      const data = await response.json();

      const movies = data.map(
        (movie) => new Movie(movie.id, movie.name, movie.price)
      );

      return movies;
    } catch (error) {
      console.error(error);
    }
  }, []);
  return { loadMovies };
}
