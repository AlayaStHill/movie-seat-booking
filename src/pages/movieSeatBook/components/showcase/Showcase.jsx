import styles from "./Showcase.module.css"
import Seat from "../seat/Seat/"


const Showcase = () => {
  return (
    <ul className={styles.showcase}>
      <li>
        <Seat className={styles.seat}/>
        <small>Ledig</small>
      </li>
      <li>
        <Seat className={styles.seat} status="selected"/>
        <small>Vald</small>
      </li>
      <li>
        <Seat className={styles.seat} status="occupied"/>
        <small>Upptagen</small>
      </li>
    </ul>
  );
}

export default Showcase;
