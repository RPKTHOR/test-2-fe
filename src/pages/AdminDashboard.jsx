import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/buses">Manage Buses</Link></li>
        <li><Link to="/admin/routes">Manage Routes</Link></li>
        <li><Link to="/admin/trips">Schedule Trips</Link></li>
        <li><Link to="/admin/reports">View Reports</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
