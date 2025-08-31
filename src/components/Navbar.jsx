import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin, isCustomer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-bus me-2"></i>
          Bus Reservation
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search Trips</Link>
            </li>
            
            {isAdmin() && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    onClick={e => e.preventDefault()}
                  >
                    Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/admin">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/admin/buses">Manage Buses</Link></li>
                    <li><Link className="dropdown-item" to="/admin/routes">Manage Routes</Link></li>
                    <li><Link className="dropdown-item" to="/admin/trips">Schedule Trips</Link></li>
                    <li><Link className="dropdown-item" to="/admin/reports">Reports</Link></li>
                  </ul>
                </li>
              </>
            )}
            
            {isCustomer() && (
              <li className="nav-item">
                <Link className="nav-link" to="/customer">My Dashboard</Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-user me-1"></i>
                  {user.name || user.email}
                </a>
                <ul className="dropdown-menu">
                  <li><span className="dropdown-item-text">Logged in as: {isAdmin() ? 'Admin' : 'Customer'}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;