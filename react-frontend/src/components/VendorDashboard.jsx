import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./VendorDashboard.css";

function VendorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalStock, setTotalStock] = useState(0);   // ✅ NEW STATE

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/vendor/dashboard" },
    { name: "Add Product", path: "/vendor/add-product" },
    { name: "Manage Products", path: "/vendor/manage-products" },
    { name: "Customer Orders", path: "/vendor/orders" },
    { name: "Inventory", path: "/vendor/inventory" },
    { name: "Account Settings", path: "/vendor/account-settings" },
  ];

  const shopLogo = localStorage.getItem("shopLogo");

  useEffect(() => {
    const vendorId = localStorage.getItem("vendor_id");

    if (vendorId) {

      // ✅ FETCH ORDERS COUNT
      fetch(`http://localhost:5000/vendor/orders/${vendorId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.orders)) {
            setTotalOrders(data.orders.length);
          }
        })
        .catch(err => {
          console.error("Error fetching vendor orders:", err);
          setTotalOrders(0);
        });

      // ✅ FETCH TOTAL STOCK
      fetch(`http://localhost:5000/api/vendor/products?vendor_id=${vendorId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const stockSum = data.reduce(
              (sum, product) => sum + Number(product.stock || 0),
              0
            );
            setTotalStock(stockSum);
          }
        })
        .catch(err => {
          console.error("Error fetching stock:", err);
          setTotalStock(0);
        });
    }

  }, []);

  return (
    <div className="vendor-dashboard">
      <aside className="sidebar">

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

              {/* ✅ Orders Badge */}
              {item.name === "Customer Orders" && totalOrders > 0 && (
                <span style={{
                  marginLeft: "8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 8px",
                  fontSize: "12px"
                }}>
                  {totalOrders}
                </span>
              )}

              {/* ✅ Inventory Badge */}
              {item.name === "Inventory" && totalStock > 0 && (
                <span style={{
                  marginLeft: "8px",
                  background: "blue",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 8px",
                  fontSize: "12px"
                }}>
                  {totalStock}
                </span>
              )}

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