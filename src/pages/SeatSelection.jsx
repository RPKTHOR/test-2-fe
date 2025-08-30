import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function SeatSelection() {
  const { tripId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/trips/${tripId}/seats`).then((res) => setSeats(res.data));
  }, [tripId]);

  const toggleSeat = (seatNumber) => {
    setSelected((prev) =>
      prev.includes(seatNumber) ? prev.filter((s) => s !== seatNumber) : [...prev, seatNumber]
    );
  };

  const holdSeats = async () => {
    const res = await api.post("/bookings/hold", { tripId, seats: selected });
    navigate(`/checkout/${res.data.bookingId}`);
  };

  return (
    <div className="container mt-4">
      <h3>Select Seats</h3>
      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat.seatNumber}
            disabled={seat.isBooked}
            className={selected.includes(seat.seatNumber) ? "btn btn-success" : "btn btn-outline-primary"}
            onClick={() => toggleSeat(seat.seatNumber)}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <button onClick={holdSeats}>Proceed to Checkout</button>
    </div>
  );
}

export default SeatSelection;
