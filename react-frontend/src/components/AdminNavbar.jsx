import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  return (
   <nav className="admin-navbar">

  {/* LEFT SIDE */}
  <div className="admin-left">

    <button className="arrow-btn" onClick={() => navigate(-1)}>←</button>

    <div
      className="admin-logo"
      onClick={() => navigate("/admin/dashboard")}
    >
      <img src={logo} alt="LocalBiz Connect" />
      <span>LocalBiz Connect</span>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <ul className="admin-nav-links">
    <li onClick={() => navigate("/admin/home")}>Home</li>

    <li onClick={() => navigate("/admin/explore")}>
      Explore Businesses
    </li>

    <li onClick={() => navigate("/admin/about")}>
      About
    </li>

    <li onClick={() => navigate("/admin/contact")}>
      Contact
    </li>

    <li onClick={() => navigate("/admin/dashboard")}>
      👤 Profile
    </li>

    {/* 👉 RIGHT ARROW */}
    <li>
      <button className="arrow-btn" onClick={() => navigate(1)}>→</button>
    </li>
  </ul>

</nav>
  );
}

export default AdminNavbar;