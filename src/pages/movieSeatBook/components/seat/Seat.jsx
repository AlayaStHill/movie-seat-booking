import styles from "./Seat.module.css";

// tar indata props.status från SeatRow och räknar ut statusClassName
const Seat = ({className, onSelectedSeat, status}) => {
  let statusClassName = "";
  if (status === "selected") {
    statusClassName = styles.selected;
    // else if, ska kunna vara det tredje alternativet N/A
  } else if (status === "occupied") {
    statusClassName = styles.occupied;
  }

  //renderar div med rätt CSS, anropar onSelectedSeat vid click
  return <div className={`${styles.seat} ${statusClassName} ${className || ""}`} onClick={onSelectedSeat}></div>;
}

export default Seat;
