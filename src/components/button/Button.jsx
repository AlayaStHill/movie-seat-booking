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
