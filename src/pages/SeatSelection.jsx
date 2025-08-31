import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { getUserId } from "../utils/auth";

function SeatSelection() {
  const { tripId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Always fetch full trip details and seats
    api.get(`/trips/${tripId}`)
      .then((tripRes) => {
        setTrip(tripRes.data);
      })
      .catch(() => {
        alert("Failed to load trip details");
      });
    api.get(`/trips/${tripId}/seats`)
      .then((seatsRes) => {
        setSeats(seatsRes.data);
      })
      .catch(() => {
        alert("Failed to load seat information");
      });
  }, [tripId]);

  const toggleSeat = (seatNumber) => {
    setSelected((prev) =>
      prev.includes(seatNumber) 
        ? prev.filter((s) => s !== seatNumber) 
        : [...prev, seatNumber]
    );
  };

const holdSeats = async () => {
  if (selected.length === 0) {
    alert("Please select at least one seat");
    return;
  }

  try {
    const userId = getUserId();
    const payload = {
      userId: userId,
      tripId: parseInt(tripId),
      seatNumbers: selected
    };
    const res = await api.post("/bookings/hold", payload);
    navigate(`/checkout/${res.data.id}`);
  } catch (err) {
    console.error('Hold seats error:', err, err.response?.data);
    alert("Failed to hold seats: " + (err.response?.data?.message || err.message));
  }
};

  // Debug: log trip object to check fare
  console.log('Trip:', trip);
  return (
    <div className="container mt-4">
      <h3>Select Seats</h3>
      {trip && trip.bus && trip.route ? (
        <div className="mb-3">
          <h5>{trip.bus.busNumber} - {trip.route.source} → {trip.route.destination}</h5>
          <p>Departure: {new Date(trip.departureTime).toLocaleString()}</p>
          {trip.fare === undefined || trip.fare === null || trip.fare === '' ? (
            <span className="text-danger">Fare not available</span>
          ) : (
            <p>Fare: ₹{!isNaN(Number(trip.fare)) ? Number(trip.fare) : 0} per seat</p>
          )}
        </div>
      ) : (
        <div className="mb-3 text-danger">Trip details unavailable.</div>
      )}
      
      <div className="seat-grid mb-3" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
        {seats.map((seat) => (
          <button
            key={seat.seatNumber}
            disabled={seat.booked}
            className={`btn ${
              seat.booked 
                ? "btn-secondary" 
                : selected.includes(seat.seatNumber) 
                ? "btn-success" 
                : "btn-outline-primary"
            }`}
            onClick={() => toggleSeat(seat.seatNumber)}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="mb-3">
          <h5>Selected Seats: {selected.join(", ")}</h5>
         <p>Total Amount: ₹{trip && !isNaN(Number(trip.fare)) ? (Number(trip.fare) * selected.length) : 0}</p>
        </div>
      )}

      <button 
        className="btn btn-primary" 
        onClick={holdSeats}
        disabled={selected.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default SeatSelection;