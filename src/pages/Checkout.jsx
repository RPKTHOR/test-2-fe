import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function Checkout() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingId) return;
    setLoading(true);
    api.get(`/bookings/${bookingId}`)
      .then((res) => setBooking(res.data))
      .catch(() => setBooking(null))
      .finally(() => setLoading(false));
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const paymentData = {
        bookingId: parseInt(bookingId),
        gatewayRef: "PAY_" + Date.now(),
        status: "SUCCESS"
      };
      
      const res = await api.post("/payments/checkout", paymentData);
      alert("Payment successful!");
      navigate(`/ticket/${bookingId}`);
    } catch (err) {
      alert("Payment failed: " + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      {loading && <div>Loading booking details...</div>}
      {!loading && !booking && <div className="text-danger">Booking not found.</div>}
      {!loading && booking && (
        <div className="card">
          <div className="card-body">
            <h5>Booking Details</h5>
            <p>Booking ID: {booking.id}</p>
            <p>Status: {booking.status || 'Hold (Payment Pending)'}</p>
            <p>Trip: {booking.trip ? `${booking.trip.route?.source} → ${booking.trip.route?.destination}` : ''}</p>
            <p>Bus: {booking.trip?.bus?.busNumber}</p>
            <p>Seats: {booking.seats ? booking.seats.map(s => s.seatNumber).join(', ') : ''}</p>
            <p>Fare: ₹{typeof booking.totalAmount === 'number' ? booking.totalAmount : (booking.trip?.fare && booking.seats ? (Number(booking.trip.fare) * booking.seats.length) : 0)}</p>
            <button 
              className="btn btn-success" 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay & Confirm Booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;