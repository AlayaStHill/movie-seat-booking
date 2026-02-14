// objekt-import
import styles from "./SelectMovie.module.css";

const SelectMovie = ({movies, onSelectedMovie, selectedMovieId}) => {
  
  
  return (
    <div className={styles.movieContainer}>
      <label htmlFor="movie">Välj film:</label>
      <select
        id="movie"
        value={selectedMovieId ?? ""}
        onChange={(e) => onSelectedMovie(e.target.value)}        
      >
        <option value="" disabled>
          Välj...
        </option>
        
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectMovie;
