import styles from "./AdminMoviesPage.module.css";
import MoviesTable from "./components/moviesTable/MoviesTable";
import { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies.js";
import MovieFormModal from "./components/movieFormModal/movieFormModal.jsx";
import ConfirmDeleteMovieModal from "./components/confirmDeleteMovieModal/ConfirmDeleteMovieModal.jsx";
import Button from "../../components/button/Button.jsx";
import Modal from "../../components/modal/Modal.jsx";

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
      const response = await fetch(
        `http://localhost:3000/movies/${values.movieId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: values.movieId,
            name: values.movieName,
            price: values.moviePrice,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Kunde inte uppdatera filmen");
      }

      setDisplay({
        modal: "success",
        title: "bekräftelse",
        successMessage: `Filmen ${values.movieName} har uppdaterats`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMovie = (movie) => {
    fetch(`http://localhost:3000/movies/${movie.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(movie.id),
    });

    setDisplay({
      modal: "success",
      title: "Bekräftelse",
      successMessage: `Filmen ${movie.name} är borttagen`,
    });
  };

  const handleCreateMovie = async (values) => {
    const newMovie = { name: values.movieName, price: values.moviePrice };

    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      // till användaren istället?
      if (!response.ok) {
        throw new Error("Kunde inte spara film");
      }

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
