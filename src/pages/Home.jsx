import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const { user, isAdmin, isCustomer } = useAuth();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="jumbotron bg-primary text-white p-5 rounded mb-4">
            <h1 className="display-4">Welcome to Bus Reservation System</h1>
            <p className="lead">Book your bus tickets easily and conveniently</p>
            {!user && (
              <Link className="btn btn-light btn-lg" to="/register" role="button">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="row">
        {!user ? (
          <>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-search fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Search Trips</h5>
                  <p className="card-text">Find buses for your route and preferred time</p>
                  <Link to="/search" className="btn btn-primary">Search Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-user-plus fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Register</h5>
                  <p className="card-text">Create an account to book tickets</p>
                  <Link to="/register" className="btn btn-success">Register</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-sign-in-alt fa-3x text-info mb-3"></i>
                  <h5 className="card-title">Login</h5>
                  <p className="card-text">Already have an account? Login here</p>
                  <Link to="/login" className="btn btn-info">Login</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {isAdmin() && (
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body text-center">
                    <i className="fas fa-cogs fa-3x text-warning mb-3"></i>
                    <h5 className="card-title">Admin Dashboard</h5>
                    <p className="card-text">Manage buses, routes, and view reports</p>
                    <Link to="pages\admin\AdminDashboard.jsx" className="btn btn-warning">Go to Admin Panel</Link>
                  </div>
                </div>
              </div>
            )}
            {isCustomer() && (
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body text-center">
                    <i className="fas fa-user fa-3x text-primary mb-3"></i>
                    <h5 className="card-title">Customer Dashboard</h5>
                    <p className="card-text">View your bookings and search for trips</p>
                    <Link to="/customer" className="btn btn-primary">Go to Dashboard</Link>
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-search fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Search Trips</h5>
                  <p className="card-text">Find and book your next journey</p>
                  <Link to="/search" className="btn btn-success">Search Trips</Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3 text-center">
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;