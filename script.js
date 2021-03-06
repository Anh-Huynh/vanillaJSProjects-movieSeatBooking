const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatCountText = document.getElementById('count');
const totalPriceText = document.getElementById('total');
const selectedMovie = document.getElementById('movie');
const movieTitle = document.getElementById('movie-title');
const movieSeat = document.getElementById('movie-seat');

populateUI();

// update seat count and price
function updateSelectedCount() {
  const selectedMoviePrice = +localStorage.getItem('moviePrice');
  const selectedMovideTitle = localStorage.getItem('movieTitle');
  const seatIds = JSON.parse(localStorage.getItem('seatIds'));
  console.log(seatIds.toString());

  const moviePrice = selectedMoviePrice
    ? selectedMoviePrice
    : +selectedMovie.value;
  const selectedSeats = document.querySelectorAll('.row .selected');
  const totalSelectedSeats = selectedSeats.length;

  // if there is a moviePrice that was selected and save in storage, use its value as the moviePrice

  // set text dynamically
  seatCountText.innerText = totalSelectedSeats;
  totalPriceText.innerText = `$${moviePrice * totalSelectedSeats}`;
  movieTitle.innerText = selectedMovideTitle;
  movieSeat.innerText = seatIds.join(' ');
}

function saveSeatSelection(e) {
  const selectedSeats = document.querySelectorAll('.row .selected');

  const selectedSeatIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  const selectedSeatId = [...selectedSeats].map((seat) => seat.dataset.seatid);
  console.log(selectedSeatId);

  localStorage.setItem('seatSelection', JSON.stringify(selectedSeatIndex));
  localStorage.setItem('seatIds', JSON.stringify(selectedSeatId));
}

function saveMovieSelection(moviePrice, movieIndex, movieTitle) {
  localStorage.setItem('moviePrice', moviePrice);
  localStorage.setItem('movieIndex', movieIndex);
  localStorage.setItem('movieTitle', movieTitle);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('seatSelection'));
  const selectedMovieIndex = +localStorage.getItem('movieIndex');

  if (selectedMovieIndex) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }
  if (selectedSeats) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  updateSelectedCount();
}

// seat selection event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    saveSeatSelection(e);
    updateSelectedCount();
  }
});

// movie selection event
selectedMovie.addEventListener('change', (e) => {
  // update movie price upon picking a different movie
  moviePrice = +e.target.value;
  const movieTitle = e.target.selectedOptions[0].dataset.title;
  const movieIndex = e.target.selectedIndex;

  // save the movie selection to local storage
  saveMovieSelection(moviePrice, movieIndex, movieTitle);

  // update the text dynamically. It's important to run this after saveMovideSelection() because they're dependent on each other
  updateSelectedCount();

  console.log(e.target.selectedOptions[0].dataset.title);
  console.log(moviePrice);
});
