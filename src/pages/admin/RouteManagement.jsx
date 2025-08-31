import { useState, useEffect } from "react";
import api from "../../services/api";

function RouteManagement() {
  const [route, setRoute] = useState({
    source: "",
    destination: "",
    distance: 0,
    duration: ""
  });
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const res = await api.get("/routes");
      setRoutes(res.data);
    } catch (err) {
      console.error("Failed to load routes");
    }
  };

  const createRoute = async () => {
    try {
      await api.post("/routes", route);
      alert("Route created successfully");
      setRoute({ source: "", destination: "", distance: 0, duration: "" });
      loadRoutes();
    } catch (err) {
      alert("Failed to create route: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Route Management</h3>
      
      <div className="card mb-4">
        <div className="card-header">Create New Route</div>
        <div className="card-body">
          <div className="mb-3">
            <input 
              className="form-control mb-2"
              placeholder="Source" 
              value={route.source}
              onChange={(e) => setRoute({ ...route, source: e.target.value })} 
            />
            <input 
              className="form-control mb-2"
              placeholder="Destination" 
              value={route.destination}
              onChange={(e) => setRoute({ ...route, destination: e.target.value })} 
            />
            <input 
              className="form-control mb-2"
              type="number" 
              placeholder="Distance (km)" 
              value={route.distance}
              onChange={(e) => setRoute({ ...route, distance: parseFloat(e.target.value) })} 
            />
            <input 
              className="form-control mb-2"
              placeholder="Duration (e.g., 2h 30m)" 
              value={route.duration}
              onChange={(e) => setRoute({ ...route, duration: e.target.value })} 
            />
            <button className="btn btn-primary" onClick={createRoute}>
              Create Route
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Existing Routes</div>
        <div className="card-body">
          {routes.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Distance</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r) => (
                    <tr key={r.id}>
                      <td>{r.source}</td>
                      <td>{r.destination}</td>
                      <td>{r.distance} km</td>
                      <td>{r.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No routes found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouteManagement;