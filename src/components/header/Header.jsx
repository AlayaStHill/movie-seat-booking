import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles.header}>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/">Boka</NavLink>
    </nav>
  );
}

export default Header;