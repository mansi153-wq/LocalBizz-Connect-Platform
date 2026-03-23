import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));         // Customer
  const vendorId = localStorage.getItem("vendor_id");           // Vendor
  const adminId = localStorage.getItem("admin_id");             // Admin

  // 🔒 If any role is logged in → block public routes
  if (user) {
    return <Navigate to="/customer/dashboard" replace />;
  }

  if (vendorId) {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  if (adminId) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children; // Not logged in → allow public route
}

export default PublicRoute;