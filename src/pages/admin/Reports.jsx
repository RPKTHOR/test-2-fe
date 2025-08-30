import { useEffect, useState } from "react";
import api from "../../services/api";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get("/reports/sales").then((res) => setReport(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Sales Report</h3>
      {report ? (
        <>
          <p>Total Revenue: ₹{report.totalRevenue}</p>
          <p>Total Bookings: {report.totalBookings}</p>
          <p>Top Routes: {report.topRoutes.join(", ")}</p>
        </>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
}

export default Reports;
