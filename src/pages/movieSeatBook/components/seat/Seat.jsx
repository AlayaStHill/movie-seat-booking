import styles from "./Seat.module.css";

const Seat = ({className, onSelectedSeat, status}) => {
  let statusClassName = "";
  if (status === "selected") {
    statusClassName = styles.selected;
  } else if (status === "occupied") {
    statusClassName = styles.occupied;
  }

  return <div className={`${styles.seat} ${statusClassName} ${className || ""}`} onClick={onSelectedSeat}></div>;
}

export default Seat;
