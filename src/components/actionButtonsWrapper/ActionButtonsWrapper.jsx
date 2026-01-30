import styles from "./ActionButtonsWrapper.module.css";

const ActionButtonsWrapper = ({children}) => {
  return <div className={styles.actions}>{children}</div>;
}

export default ActionButtonsWrapper;
