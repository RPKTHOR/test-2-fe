import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Ticket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${ticketId}`).then((res) => setTicket(res.data));
  }, [ticketId]);

  return (
    <div className="container mt-4">
      <h3>Your Ticket</h3>
      {ticket && (
        <>
          <p>Trip: {ticket.tripDetails}</p>
          <p>Seats: {ticket.seats.join(", ")}</p>
          <img src={ticket.qrCodeUrl} alt="QR Code" />
          <a href={ticket.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
        </>
      )}
    </div>
  );
}

export default Ticket;
