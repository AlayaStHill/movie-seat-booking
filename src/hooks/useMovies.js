import { useCallback } from "react";
import { getMovies } from "../storage/moviesStorage";

export const useMovies = () => {
  const loadMovies = useCallback(async () => {
    try {
      return getMovies();
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  return { loadMovies };
};

// const response = await fetch(`${API_URL}/movies`);

// if (!response.ok) {
//   return [];
// }
// const data = await response.json();
