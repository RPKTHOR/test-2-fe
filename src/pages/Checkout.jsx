import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const res = await api.post("/payments/checkout", { bookingId });
    navigate(`/ticket/${res.data.ticketId}`);
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <p>Booking ID: {bookingId}</p>
      <button onClick={handlePayment}>Pay & Confirm</button>
    </div>
  );
}

export default Checkout;
