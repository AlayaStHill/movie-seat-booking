import styles from "./SeatRow.module.css";
import Seat from "../../seat/Seat";

const SeatRow = ({dataSeats, onSelectedSeat}) => {
  return (
    <div className={styles.row}>
      {dataSeats.map((dataSeat) => (
        <Seat
          key={dataSeat.id}
          className={styles.seat}
          status={dataSeat.status}
          onSelectedSeat={() => onSelectedSeat(dataSeat.id)}
        />
      ))}
    </div>
  );
}

export default SeatRow;
