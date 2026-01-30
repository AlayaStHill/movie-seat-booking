import styles from "./Form.module.css";

const Form = ({ children, onSubmit }) => {
  return (
    // noValidate för att inaktivera webbläsarens inbyggda validering
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
};

export default Form;
