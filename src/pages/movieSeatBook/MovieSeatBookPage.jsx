import styles from "./MovieSeatBookPage.module.css";
import SelectMovie from "./components/selectMovie/SelectMovie";
import Showcase from "./components/showcase/Showcase";
import Screen from "./components/screen/Screen";
import Seats from "./components/seats/Seats";
import OrderSummary from "./components/orderSummary/OrderSummary";
import { initialDataSeats } from "./data/initialDataSeats.js";
import { useEffect, useState } from "react";
import Button from "../../components/button/Button.jsx";
import Modal from "../../components/modal/Modal.jsx";
import { useMovies } from "../../hooks/useMovies.js";
import MovieBookFormModal from "./components/movieBookFormModal/MovieBookFormModal.jsx";

const MovieSeatBookPage = () => {
  // initialDataSeats = grundtillståndet
  const [dataSeats, setDataSeats] = useState(initialDataSeats);
  const [order, setOrder] = useState({ amount: 0, totalPrice: 0 });
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [displayBookingModal, setDisplayBookingModal] = useState(false);
  const [displayBookingSuccess, setDisplayBookingSuccess] = useState(false);
  const { loadMovies } = useMovies();

  // useEffect = för sånt som händer utanför rendering. [] = dependency-array, om tom - lyssnar ej på några dependencies och körs endast vid mount.
  useEffect(() => {
    // hjälpfunktion för att useEffect inte kan vara asynkron 
     const fetchAndSetMovies = async () => {
      const moviesFromDb = await loadMovies();

      if (moviesFromDb) {
        setMovies(moviesFromDb);
      }
    }

    fetchAndSetMovies();

    // Kör om effekten om loadMovies ändras
  }, [loadMovies]);

  const handleSelectedSeat = (id) => {
    if (currentMovie === null) {
      return;
    }
    // prev.. inbyggd parameter för det aktuella statet - nödvändigt här?
    // immutabel uppdatering av arrayen (initialData.. oförändrad). Skapar en ny array där det matchande objektet helt byts ut och får rätt status.
    setDataSeats((prevDataSeats) => {
      const newDataSeats = prevDataSeats.map((dataSeat) => {
        if (dataSeat.id !== id) {
          return dataSeat;
        }

        if (dataSeat.status === "occupied") {
          return dataSeat;
        }

        //ternary-operators + spread-operator som skapar ett nytt objekt och skriver över status (togglar - om "selected" -> "")
        return {
          ...dataSeat,
          status: dataSeat.status === "" ? "selected" : "",
        };
      });

      const selectedCount = newDataSeats.filter(
        (dataSeat) => dataSeat.status === "selected",
      ).length;

      setOrder({
        amount: selectedCount,
        totalPrice: currentMovie.price * selectedCount,
      });

      return newDataSeats;
    });
  }

  // Ge pris och nollställ stolar och order
  const handleSelectedMovie = (id) => {
    setDataSeats(initialDataSeats);
    setOrder({ amount: 0, totalPrice: 0 });
    setCurrentMovie(movies.find((movie) => movie.id === id));
  }

  const handleOpenBookModal = () => {
    if (order.amount === 0 || order.totalPrice === 0) {
      return;
    }

    setDisplayBookingModal(true);
  }

  const handleBookingSubmit = async (values) => {
    const bookingRequest = {
      name: values.name,
      phone: values.phone,
      movieId: currentMovie.id,
      amountOfSeats: order.amount,
      totalPrice: order.totalPrice,
    };
    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingRequest),
      });

      if (response.ok) {
        setDisplayBookingSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBookingReset = () => {
    setDisplayBookingModal(false);
    setDisplayBookingSuccess(false);
    setCurrentMovie(null);
    setDataSeats(initialDataSeats);
    setOrder({ amount: 0, totalPrice: 0 });
  }

  return (
    <div className={styles.pageLayout}>
      <SelectMovie
        movies={movies}
        selectedMovieId={currentMovie ? currentMovie.id : null}
        onSelectedMovie={handleSelectedMovie}
      />
      <Showcase />
      <div className={styles.container}>
        <Screen />
        <Seats dataSeats={dataSeats} onSelectedSeat={handleSelectedSeat} />
      </div>
      <OrderSummary order={order} />
      <Button
        onClick={handleOpenBookModal}
        className={styles.primaryButton}
        disabled={order.amount === 0 || order.totalPrice === 0}
      >
        Boka
      </Button>
      {displayBookingModal ? (
        displayBookingSuccess ? (
          <Modal onClose={handleBookingReset} title="Bokningsbekräftelse">
            <p>Tack för din bokning!</p>
          </Modal>
        ) : (
          <MovieBookFormModal
            onClose={() => setDisplayBookingModal(false)}
            onSubmit={handleBookingSubmit}
            title="Bokningsformulär"
          />
        )
      ) : null}
    </div>
  );
}

export default MovieSeatBookPage;
