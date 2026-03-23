import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function VNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

  {/* LEFT SIDE */}
  <div className="nav-left">

    <button className="arrow-btn" onClick={() => navigate(-1)}>←</button>

    <div className="logo" onClick={() => navigate("/vendor/dashboard")}>
      <img src={logo} alt="LocalBiz Connect" />
      <span>LocalBiz Connect</span>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <ul className="nav-links">
    
    <li onClick={() => navigate("/vendor/home")}>Home</li>

    <li onClick={() => navigate("/vendor/explore")}>
      Explore Businesses
    </li>

    <li onClick={() => navigate("/vendor/about")}>
      About
    </li>

    <li onClick={() => navigate("/vendor/contact")}>
      Contact
    </li>

    <li className="login" onClick={() => navigate("/vendor/dashboard")}>
      Profile
    </li>

    {/* 👉 RIGHT ARROW */}
    <li>
      <button className="arrow-btn" onClick={() => navigate(1)}>→</button>
    </li>

  </ul>

</nav>
  );
}

export default VNavbar;