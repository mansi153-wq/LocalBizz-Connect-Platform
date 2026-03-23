import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import CustomerSidebar from "./CustomerSidebar";
import { useEffect } from "react";
function CustomerLayout() {
const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 If not logged in → go to login
  if (!user) {
    navigate("/login", { replace: true });
    return;
  }

  // 🔒 Handle back button (IMPORTANT)
  const handleBack = () => {
    const path = window.location.pathname;

    // If trying to go outside customer routes
    if (!path.startsWith("/customer")) {
      navigate("/customer/dashboard", { replace: true });
    }
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };

}, [navigate]);


  // ✅ Sidebar routes (UNCHANGED)
  const showSidebarRoutes = [
    "/customer/dashboard",
    "/customer/orders",
    "/customer/explore",
    "/customer/profile"
  ];

  const showSidebar = showSidebarRoutes.includes(location.pathname);

  // ✅ Only for Home/About/Contact
  const publicRoutes = [
    "/customer/home",
    "/customer/about",
    "/customer/contact"
  ];

  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <div>
      <CustomerNavbar />

      <div style={{ display: "flex" }}>
        
        {/* ✅ Sidebar (same as before) */}
        {showSidebar && <CustomerSidebar />}

        {/* ✅ Content */}
        <div
          style={{
            flex: 1,
           
            marginLeft: showSidebar ? "220px" : "0px", // 👈 KEEP OLD ALIGNMENT
            marginTop: isPublicPage ? "10px" : "0px" // 👈 ONLY FIX PUBLIC PAGES
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default CustomerLayout;