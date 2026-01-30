import styles from "./Button.module.css";

const Button = ({
  children,
  className,
  disabled,
  onClick,
  type = "button",
  variant,
}) => {
  return (
    // children = special props. Motsvarar innehållet mellan öppnings-stängningstag från föräldern
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button} ${className ?? ""} ${styles[variant] ?? ""} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
