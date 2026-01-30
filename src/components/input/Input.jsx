import styles from "./Input.module.css";

const Input = ({
  id,
  labelText,
  value,
  errorMessage = "",
  onChange,
  type = "text",
  required,
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        id={id}
        value={value}
        // Vid användning av e.target.value ger alltid en sträng oavsett type
        onChange={(e) =>
          onChange(
            type === "number" && e.target.value.length > 0
              ? e.target.valueAsNumber
              : e.target.value,
          )
        }
        required={required ?? false}
      />
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
};

export default Input;
