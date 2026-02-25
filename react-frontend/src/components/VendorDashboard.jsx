import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./VendorDashboard.css";

function VendorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/vendor/dashboard" },
    { name: "Add Product", path: "/vendor/add-product" },
    { name: "Manage Products", path: "/vendor/manage-products" },
    { name: "Inventory", path: "/vendor/inventory" },
    { name: "Account Settings", path: "/vendor/account-settings" },
  ];

  // ✅ get the vendor shop logo from localStorage
  const shopLogo = localStorage.getItem("shopLogo");

  return (
    <div className="vendor-dashboard">
      <aside className="sidebar">
        {/* Always show the shop logo instead of "Vendor" text */}
        <div className="vendor-logo">
          {shopLogo && (
            <img
              src={shopLogo}
              alt="Shop Logo"
              className="logo-img"
              onClick={() => navigate("/vendor/account-settings")}
            />
          )}
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
          <button
  className="logout"
  onClick={() => navigate("/logout")}
>
  Logout
</button>


        </nav>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default VendorDashboard;
