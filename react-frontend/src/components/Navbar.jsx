import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css"; // optional if you separate css

function Navbar() {
  const navigate = useNavigate();

  return (
    
   <nav className="navbar">

  {/* LEFT SIDE */}
  <div className="nav-left">
    <button className="arrow-btn" onClick={() => navigate(-1)}>←</button>

    <div className="logo" onClick={() => navigate("/")}>
      <img src={logo} alt="LocalBiz Connect" />
      <span>LocalBiz Connect</span>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <ul className="nav-links">
    <li onClick={() => navigate("/")}>Home</li>

    <li onClick={() => navigate("/explore")}>
      Explore Businesses
    </li>

    <li onClick={() => navigate("/about")}>
      About
    </li>

    <li onClick={() => navigate("/contact")}>
      Contact
    </li>

    <li className="login" onClick={() => navigate('/login')}>
      Login
    </li>

    <li>
      <button
        onClick={() => navigate('/signup')}
        className="register-btn"
      >
        Register
      </button>
    </li>

    {/* 👉 RIGHT ARROW HERE */}
    <li>
      <button className="arrow-btn" onClick={() => navigate(1)}>→</button>
    </li>

  </ul>

</nav>
  );
}

export default Navbar;