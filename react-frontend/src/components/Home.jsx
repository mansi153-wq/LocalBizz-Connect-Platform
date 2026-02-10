import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/image.png";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="LocalBiz Connect" />
          <span>LocalBiz Connect</span>
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Explore Businesses</li>
          <li>Become a Vendor</li>
          <li>About Us</li>
          <li>Contact</li>
          <li className="login" onClick={() => navigate('/login')}>
            Login
          </li>
          <li>
            <button onClick={() => navigate('/signup')} className="register-btn">
              Register
            </button>
          </li>
        </ul>
      </nav>

      {/* ===== HERO SECTION ===== */}
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
          <div className="buttons">
          <button className="explore-btn">Explore Businesses →</button>
          <button
            className="vendor-btn"
            onClick={() => navigate("/vendor/signup")}
            >
     Register as Vendor
  </button>
</div>

        </div>

        <div className="hero-image">
          <img src={sideImage} alt="Business" />
        </div>
      </section>
    </>
  );
}

export default Home;
