import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminLayout.css";
import { useEffect } from "react";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("admin_id");
    navigate("/admin/login", { replace: true });
  };

  // ✅ Sidebar visible routes
  const sidebarRoutes = [
    "/admin/dashboard",
    "/admin/vendors",
    "/admin/customers",
    "/admin/products",
    "/admin/orders",
    "/admin/analytics"
  ];
  const showSidebar = sidebarRoutes.includes(location.pathname);

  // 🔒 PROTECT ADMIN PANEL
  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");

    // Not logged in → redirect to login
    if (!adminId) {
      navigate("/admin/login", { replace: true });
      return;
    }

    // Prevent back button from going outside admin panel
    const handleBack = () => {
      const path = window.location.pathname;
      if (!path.startsWith("/admin")) {
        navigate("/admin/dashboard", { replace: true });
      }
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);

  return (
    <>
      <AdminNavbar />

      <div className="admin-container">

        {showSidebar && (
          <div className="admin-sidebar">
            <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "active" : ""}>Dashboard</Link>
            <Link to="/admin/vendors">Vendors</Link>
            <Link to="/admin/customers">Customers</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/analytics">Analytics</Link>
            <button onClick={logout}>Logout</button>
          </div>
        )}

        <div
          className="admin-content"
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: showSidebar ? "1px" : "-20px",
            marginTop: showSidebar ? "1px" : "-50px"
          }}
        >
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default AdminLayout;