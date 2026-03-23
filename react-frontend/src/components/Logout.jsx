import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // clear auth data
    localStorage.removeItem("vendor_id");
    localStorage.removeItem("shopLogo");
    localStorage.removeItem("token");

    // wait 1.5 sec then redirect
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [navigate]);

  return (
    <div className="logout-page">
      <div className="logout-box">
        <div className="spinner"></div>
        <h2>  </h2>
        <p> </p>
      </div>
    </div>
  );
}

export default Logout;
