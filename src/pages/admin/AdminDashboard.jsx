import React from 'react'

import LogoutButton from "../../components/LogoutButton";

import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Manage buses, routes, trips, and view reports.</p>
      <div className="list-group mb-3">
        <Link to="/admin/buses" className="list-group-item list-group-item-action">Bus Management</Link>
        <Link to="/admin/routes" className="list-group-item list-group-item-action">Route Management</Link>
        <Link to="/admin/trips" className="list-group-item list-group-item-action">Trip Scheduler</Link>
        <Link to="/admin/reports" className="list-group-item list-group-item-action">Reports</Link>
      </div>
      <LogoutButton />
    </div>
  );
}

export default AdminDashboard