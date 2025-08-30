import { useState } from "react";
import api from "../../services/api";

function RouteManagement() {
  const [route, setRoute] = useState({
    source: "",
    destination: "",
    stops: ""
  });

  const createRoute = async () => {
    await api.post("/routes", route);
    alert("Route created successfully");
  };

  return (
    <div className="container mt-4">
      <h3>Create Route</h3>
      <input placeholder="Source" onChange={(e) => setRoute({ ...route, source: e.target.value })} />
      <input placeholder="Destination" onChange={(e) => setRoute({ ...route, destination: e.target.value })} />
      <input placeholder="Stops (comma-separated)" onChange={(e) => setRoute({ ...route, stops: e.target.value })} />
      <button onClick={createRoute}>Create Route</button>
    </div>
  );
}

export default RouteManagement;
