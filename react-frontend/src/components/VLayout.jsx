import { Outlet, useNavigate } from "react-router-dom";
import VNavbar from "./VNavbar";
import { useEffect } from "react";

function VLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const vendorId = localStorage.getItem("vendor_id");

    // ✅ Redirect to login if not logged in
    if (!vendorId) {
      navigate("/vendor/login", { replace: true });
    }

    // ✅ Prevent going back to public pages using back button
    const handlePopState = (e) => {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/vendor")) {
        navigate("/vendor/dashboard", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <>
      <VNavbar />
      <Outlet />
    </>
  );
}

export default VLayout;