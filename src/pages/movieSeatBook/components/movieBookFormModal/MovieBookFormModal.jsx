import Button from "../../../../components/button/Button";
import Input from "../../../../components/input/Input";
import Modal from "../../../../components/modal/Modal";
import Form from "../../../../components/form/Form";
import { useState } from "react";

const MovieBookFormModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidName = validateName();
    const isValidPhone = validatePhone();

    if (isValidName === true && isValidPhone === true) {
      onSubmit({ name, phone });
    }
  };

  const validateName = () => {
    const trimmedNameValue = name.trim();

    if (trimmedNameValue === "") {
      setNameErrorMessage("Ange namn");
      return false;

      // Regex för att kolla om värdet innehåller siffror
    } else if (/\d/.test(trimmedNameValue)) {
      setNameErrorMessage("Namnet får inte innehålla siffror");

      return false;
    } else {
      setNameErrorMessage(null);

      return true;
    }
  };

  const validatePhone = () => {
    const trimmedPhoneValue = phone.trim();
    // Regex tillåt bara: +, siffror, mellanslag och parenteser
    const allowedChars = /^[+]?[\d\s()-]*$/;
    // Regex: tar bort alla icke-siffror och ger antal siffror
    const digitsOnly = trimmedPhoneValue.replace(/\D/g, "");

    if (trimmedPhoneValue === "") {
      setPhoneErrorMessage("Ange telefonnummer");

      return false;
    } else if (!allowedChars.test(trimmedPhoneValue)) {
      setPhoneErrorMessage("Ogiltigt format");

      return false;
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setPhoneErrorMessage("Ogiltig längd: 7-15 siffror");

      return false;
    } else {
      setPhoneErrorMessage(null);

      return true;
    }
  };

  const handleNameInputChange = (nameValue) => {
    setName(nameValue);
    setNameErrorMessage(null);
  };

  const handlePhoneInputChange = (phoneValue) => {
    setPhone(phoneValue);
    setPhoneErrorMessage(null);
  };

  return (
    <Modal onClose={onClose} title="Bokningsformulär">
      <Form onSubmit={handleSubmit} noValidate>
        <Input
          id="name"
          labelText="Namn"
          value={name}
          onChange={handleNameInputChange}
          required
          errorMessage={nameErrorMessage}
        />
        <Input
          id="phone"
          type="tel"
          labelText="Telefonnummer"
          value={phone}
          onChange={handlePhoneInputChange}
          required
          errorMessage={phoneErrorMessage}
        />

        <Button variant="primary" type="submit">
          Skicka
        </Button>
      </Form>
    </Modal>
  );
};

export default MovieBookFormModal;
