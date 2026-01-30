import Modal from "../../../../components/modal/Modal";
import Button from "../../../../components/button/Button";
import ActionButtonsWrapper from "../../../../components/actionButtonsWrapper/ActionButtonsWrapper";

const ConfirmDeleteMovieModal = ({ onClose, movie, onConfirm }) => {
  return (
    <Modal onClose={onClose} title="Ta bort film">
      <p>Vill du ta bort filmen {movie.name}?</p>
      <ActionButtonsWrapper>
        <Button onClick={() => onConfirm(movie)} variant="destructive">
          Ja
        </Button>
        <Button onClick={onClose}>Avbryt</Button>
      </ActionButtonsWrapper>
    </Modal>
  );
}

export default ConfirmDeleteMovieModal;
