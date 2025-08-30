import { useState, useEffect } from "react";
import api from "../../services/api";

function TripScheduler() {
  const [trip, setTrip] = useState({
    busId: "",
    routeId: "",
    departureTime: "",
    arrivalTime: "",
    fare: ""
  });

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    api.get("/buses").then((res) => setBuses(res.data));
    api.get("/routes").then((res) => setRoutes(res.data));
  }, []);

  const scheduleTrip = async () => {
    await api.post("/trips", trip);
    alert("Trip scheduled successfully");
  };

  return (
    <div className="container mt-4">
      <h3>Schedule Trip</h3>
      <select onChange={(e) => setTrip({ ...trip, busId: e.target.value })}>
        <option>Select Bus</option>
        {buses.map((bus) => <option key={bus.id} value={bus.id}>{bus.busNumber}</option>)}
      </select>
      <select onChange={(e) => setTrip({ ...trip, routeId: e.target.value })}>
        <option>Select Route</option>
        {routes.map((route) => <option key={route.id} value={route.id}>{route.source} → {route.destination}</option>)}
      </select>
      <input type="datetime-local" placeholder="Departure" onChange={(e) => setTrip({ ...trip, departureTime: e.target.value })} />
      <input type="datetime-local" placeholder="Arrival" onChange={(e) => setTrip({ ...trip, arrivalTime: e.target.value })} />
      <input type="number" placeholder="Fare" onChange={(e) => setTrip({ ...trip, fare: e.target.value })} />
      <button onClick={scheduleTrip}>Schedule Trip</button>
    </div>
  );
}

export default TripScheduler;
