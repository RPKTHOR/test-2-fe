import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import { getUserRole } from "./utils/auth";
import SearchTrips from "./pages/SearchTrips";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import Ticket from "./pages/Ticket";
import BusManagement from "./pages/admin/BusManagement";
import RouteManagement from "./pages/admin/RouteManagement";
import TripScheduler from "./pages/admin/TripScheduler";
import Reports from "./pages/admin/Reports";
import axios from "axios";

function App() {
  const role = getUserRole();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={role === "ROLE_ADMIN" ? "/admin" : "/customer"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      {/*  <Route path="/admin" element={role === "ROLE_ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/customer" element={role === "ROLE_CUSTOMER" ? <CustomerDashboard /> : <Navigate to="/login" />} /> */}
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/customer" element={<CustomerDashboard />} />

        <Route path="/search" element={<SearchTrips />} />
        <Route path="/seats/:tripId" element={<SeatSelection />} />
        <Route path="/checkout/:bookingId" element={<Checkout />} />
        <Route path="/ticket/:ticketId" element={<Ticket />} />
        <Route path="/admin/buses" element={<BusManagement />} />
        <Route path="/admin/routes" element={<RouteManagement />} />
        <Route path="/admin/trips" element={<TripScheduler />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
