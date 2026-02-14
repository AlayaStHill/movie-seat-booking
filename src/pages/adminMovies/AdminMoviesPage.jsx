import styles from "./AdminMoviesPage.module.css";
import MoviesTable from "./components/moviesTable/MoviesTable";
import { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies.js";
import MovieFormModal from "./components/movieFormModal/movieFormModal.jsx";
import ConfirmDeleteMovieModal from "./components/confirmDeleteMovieModal/ConfirmDeleteMovieModal.jsx";
import Button from "../../components/button/Button.jsx";
import Modal from "../../components/modal/Modal.jsx";
import { createMovie, updateMovie, deleteMovie } from "../../storage/moviesStorage";

const AdminMoviesPage = () => {
  const { loadMovies } = useMovies();
  const [movies, setMovies] = useState([]);
  const [chosenMovie, setChosenMovie] = useState(null);
  const [display, setDisplay] = useState({ modal: "", title: "", successMessage: ""});

  useEffect(() => {
    // för att useEffect inte är async
    const fetchAndSetMovies = async () => {
      const moviesFromDb = await loadMovies();

      if (moviesFromDb) {
        setMovies(moviesFromDb);
      }
    };

    fetchAndSetMovies();

    // Kör effekten om loadMovies någonsin ändras
  }, [loadMovies, display.successMessage]);

  const handleOpenEditModal = (id) => {
    const movieToEdit = movies.find((movie) => movie.id === id);

    if (!movieToEdit) {
      return;
    }
    // Ändra enbart modal för att trigga Edit-Modal, spread resten av properties
    setDisplay({ ...display, modal: "edit" });
    // originaldata db.json
    setChosenMovie(movieToEdit);
  };

  const handleOpenDeleteModal = (id) => {
    const movieToDelete = movies.find((movie) => movie.id === id);

    if (!movieToDelete) {
      return;
    }

    setDisplay({ ...display, modal: "delete" });
    setChosenMovie(movieToDelete);
  };

  const handleResetState = () => {
    setDisplay({ modal: "", title: "", successMessage: "" });
    setChosenMovie(null);
  };

const handleUpdateMovie = async (values) => {
  try {
    updateMovie({
      id: values.movieId,
      name: values.movieName,
      price: values.moviePrice,
    });

    setDisplay({
      modal: "success",
      title: "Bekräftelse",
      successMessage: `Filmen ${values.movieName} har uppdaterats`,
    });
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteMovie = async (movie) => {
  try {
    deleteMovie(movie.id);

    setDisplay({
      modal: "success",
      title: "Bekräftelse",
      successMessage: `Filmen ${movie.name} är borttagen`,
    });
  } catch (error) {
    console.error(error);
  }
};

const handleCreateMovie = async (values) => {
  try {
    createMovie({ name: values.movieName, price: values.moviePrice });

    setDisplay({
      modal: "success",
      successMessage: `Filmen ${values.movieName} har lagts till`,
      title: "Bekräftelse",
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className={styles.container}>
      <h1 className={styles.AdminMoviesPage}>Hantera filmer</h1>
      <Button
        className={`${styles.createButton} ${styles.action}`}
        onClick={() => setDisplay({ ...display, modal: "create" })}
        variant="primary"
      >
        Ny film <i className="fa-solid fa-plus"></i>
      </Button>
      <MoviesTable
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        movies={movies}
      />
      {display.modal === "create" && (
        <MovieFormModal
          onClose={handleResetState}
          title="Ny film"
          onSubmit={handleCreateMovie}
          movies={movies}
        />
      )}
      {display.modal === "delete" && (
        <ConfirmDeleteMovieModal
          onClose={handleResetState}
          movie={chosenMovie}
          onConfirm={handleDeleteMovie}
        />
      )}
      {display.modal === "edit" && (
        <MovieFormModal
          onClose={handleResetState}
          title="Redigera"
          onSubmit={handleUpdateMovie}
          movie={chosenMovie}
          movies={movies}
        />
      )}

      {display.modal === "success" && (
        <Modal onClose={handleResetState} title={display.title}>
          <p>{display.successMessage}</p>
        </Modal>
      )}
    </div>
  );
};

export default AdminMoviesPage;
