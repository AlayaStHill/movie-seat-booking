import styles from "./SeatRow.module.css";
import Seat from "../../seat/Seat";

const SeatRow = ({dataSeats, onSelectedSeat}) => {
  return (
    <div className={styles.row}>
      {/* för varje objekt i dataSeats, skapa ett React-element med props-värden från respektive objekt */}
      {dataSeats.map((dataSeat) => (
        <Seat
          key={dataSeat.id}
          // SeatRow-styling av Seat
          className={styles.seat}
          status={dataSeat.status}
          onSelectedSeat={() => onSelectedSeat(dataSeat.id)}
        />
      ))}
    </div>
  );
}

export default SeatRow;
