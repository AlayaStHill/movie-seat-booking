import styles from "./Modal.module.css";

// lägger en position:fixed komponent ovanpå sidan med index-z
const Modal = ({className, title, onClose, children}) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${className ?? ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title ?? ""}</h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
