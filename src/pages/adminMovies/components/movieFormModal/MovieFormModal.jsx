import Modal from "../../../../components/modal/Modal";
import ActionButtonsWrapper from "../../../../components/actionButtonsWrapper/ActionButtonsWrapper";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import Form from "../../../..//components/form/Form";
import { useState } from "react";

const MovieFormModal = ({ onClose, movies, movie, onSubmit, title }) => {
  // Om movie och movie.name finns använd det annars "" --> movie !== null && movie.name !== null
  const [movieName, setMovieName] = useState(movie?.name ?? "");
  const [moviePrice, setMoviePrice] = useState(movie?.price ?? 0);
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [priceErrorMessage, setPriceErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    const movieNameTrim = movieName.trim();

    if (!movieNameTrim) {
      setNameErrorMessage("Ange filmens titel");
      isValid = false;
    } else {
      // finns en film med samma namn fast annat id
      const exists = movies.some((m) => m.name.toLowerCase() === movieNameTrim.toLowerCase() && m.id !== movie?.id);
      if (exists) {
        setNameErrorMessage("En film med samma titel finns redan");
        isValid = false;
      } else {
        // rensar tidigare fel
        setNameErrorMessage(null);
      }
    }

    if (moviePrice <= 0) {
      setPriceErrorMessage("Ange pris");
      isValid = false;
    } else {
      setPriceErrorMessage(null);
    }

    if (!isValid) {
      return;
    }

    onSubmit({ movieName, moviePrice, movieId: movie?.id ?? "" });
  }

  return (
    <Modal onClose={onClose} title={title}>
      <Form onSubmit={handleSubmit}>
        <Input
          id="name"
          labelText="Namn"
          required
          value={movieName}
          onChange={setMovieName}
          errorMessage={nameErrorMessage}
        />
        <Input
          type="number"
          id="price"
          labelText="Pris"
          required
          value={moviePrice}
          onChange={setMoviePrice}
          errorMessage={priceErrorMessage}
        />
        <ActionButtonsWrapper>
          <Button type="submit" variant="primary">
            Spara
          </Button>
          <Button onClick={onClose} variant="secondary">
            Avbryt
          </Button>
        </ActionButtonsWrapper>
      </Form>
    </Modal>
  );
}

export default MovieFormModal;
