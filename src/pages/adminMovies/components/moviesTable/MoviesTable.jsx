import styles from "./MoviesTable.module.css";

const MoviesTable = ({ movies, onEdit, onDelete }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Namn</th>
            <th>Pris (kr)</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className={styles.id}>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.price}</td>
              <td className={styles.actions}>
                <button
                  className={`${styles.editButton} ${styles.actionButton}`}
                  type="button"
                  onClick={() => onEdit(movie.id)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
              <td className={styles.actions}>
                <button
                  className={`${styles.deleteButton} ${styles.actionButton}`}
                  type="button"
                  onClick={() => onDelete(movie.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesTable;
