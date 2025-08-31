import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
// Removed incorrect import of user

const SearchTrips = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    travelDate: ''
  });
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const { isCustomer, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const response = await api.get('/trips/search', {
  params: {
    source: formData.source,
    destination: formData.destination,
    date: formData.travelDate
  }
});
      setTrips(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

 const handleBookTrip = (trip) => {
  console.log('user:', user);
  console.log('user.roles:', user?.roles);
  if (!user) {
    alert('Please login to book trips');
    navigate('/login');
    return;
  }
  if (!isCustomer()) {
    alert('Only customers can book trips');
    return;
  }
  navigate(`/seats/${trip.id}`, { state: { trip } });
 };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-search me-2"></i>
            Search Bus Trips
          </h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="source" className="form-label">From</label>
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      placeholder="Source city"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="destination" className="form-label">To</label>
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Destination city"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="travelDate" className="form-label">Travel Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="travelDate"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Searching...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Search Trips
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {searched && (
        <div className="row">
          <div className="col-12">
            <h4>Search Results</h4>
            {trips.length === 0 ? (
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                No trips found for the selected route and date.
              </div>
            ) : (
              <div className="row">
                {trips.map((trip) => (
                  <div key={trip.id} className="col-md-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title">
                              {trip.busNumber} - {trip.busType}
                            </h5>
                            <p className="card-text">
                              <strong>Operator:</strong> {trip.operatorName}
                            </p>
                          </div>
                          <div className="text-end">
                            <h4 className="text-primary">₹{trip.fare}</h4>
                            <small className="text-muted">per seat</small>
                          </div>
                        </div>
                        
                        <div className="row mt-3">
                          <div className="col-6">
                            <small className="text-muted">Departure</small>
                            <p className="mb-1">
                              <i className="fas fa-clock me-1"></i>
                              {new Date(trip.departureTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <p className="text-muted small">{trip.source}</p>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Arrival</small>
                            <p className="mb-1">
                              <i className="fas fa-clock me-1"></i>
                              {new Date(trip.arrivalTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <p className="text-muted small">{trip.destination}</p>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div>
                            <span className={`badge ${trip.availableSeats > 10 ? 'bg-success' : trip.availableSeats > 5 ? 'bg-warning' : 'bg-danger'}`}>
                              {trip.availableSeats} seats available
                            </span>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleBookTrip(trip)}
                            disabled={trip.availableSeats === 0}
                          >
                            {trip.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTrips;