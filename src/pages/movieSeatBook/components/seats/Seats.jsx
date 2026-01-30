import SeatRow from "./seatRow/SeatRow";

const Seats = ({dataSeats, onSelectedSeat}) => {
  const seatsPerRow = 8;
  const amountOfSeatRows = dataSeats.length / seatsPerRow;
  
  let firstSeatIndex = 0;
  let lastSeatIndex = seatsPerRow;

  const content = [];
  // Skapar raderna
  for (let i = 0; i < amountOfSeatRows; i++) {    
    content.push(
      <SeatRow
        // attribut (prop) = unikt id som React kräver för att kunna hålla koll på list-elementen mellan renderingar i loopen
        key={i}
        // Plockar ut alla objekt mellan first- till lastSeat-index och tilldelar dataSeats i varje SeatRow.
        dataSeats={dataSeats.slice(firstSeatIndex, lastSeatIndex)}
        // props.onSelectedSeat motsvarar --> <Seats onSelectedSeats=... i MovieSeatBookPage
        onSelectedSeat={onSelectedSeat}
      />
    );

    firstSeatIndex += seatsPerRow;
    lastSeatIndex += seatsPerRow;
  }

  return <>{ content }</>
}

export default Seats;
