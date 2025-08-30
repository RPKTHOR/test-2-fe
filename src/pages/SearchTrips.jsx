import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function SearchTrips() {
  const [form, setForm] = useState({ source: "", destination: "", date: "" });
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const res = await api.get("/trips/search", { params: form });
    setTrips(res.data);
  };

  return (
    <div className="container mt-4">
      <h3>Search Trips</h3>
      <input placeholder="Source" onChange={(e) => setForm({ ...form, source: e.target.value })} />
      <input placeholder="Destination" onChange={(e) => setForm({ ...form, destination: e.target.value })} />
      <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.busName} - {trip.departureTime}
            <button onClick={() => navigate(`/seats/${trip.id}`)}>Select Seats</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTrips;
