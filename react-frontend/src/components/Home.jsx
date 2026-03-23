import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  // ✅ Check if any user is logged in
  const user = JSON.parse(localStorage.getItem("user"));
  const vendorId = localStorage.getItem("vendor_id");
  const adminId = localStorage.getItem("admin_id");

  const isPublicUser = !user && !vendorId && !adminId;

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>
            Discover & Connect <br /> with Local <br /> Businesses Near You
          </h1>

          <p>
            LocalBiz Connect is your trusted platform to discover local
            businesses and send enquiries directly. No middlemen, no
            commissions—just direct connections that support your local
            community.
          </p>

          {isPublicUser && (
            <div className="buttons">
              <button
                className="explore-btn"
                onClick={() => navigate("/vendor/login")}
              >
                Login as Vendor
              </button>

              <button
                className="vendor-btn"
                onClick={() => navigate("/vendor/signup")}
              >
                Register as Vendor
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;