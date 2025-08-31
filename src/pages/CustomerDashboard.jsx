
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
function CustomerDashboard() {
  return (
    <div className="container mt-5">
      <h2>Customer Dashboard</h2>
      <div className="list-group mb-3">
        <Link to="/search" className="list-group-item list-group-item-action">Search Trips</Link>
        <Link to="#" className="list-group-item list-group-item-action disabled">My Bookings (coming soon)</Link>
      </div>
      <LogoutButton />
    </div>
  );
}

export default CustomerDashboard;
