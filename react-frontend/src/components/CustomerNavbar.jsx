import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./CustomerNavbar.css";

function CustomerNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

const logout = () => {
  localStorage.removeItem("user"); // 🔥 better than clear()
  navigate("/login", { replace: true });
};

  if (!user) return null; // prevent rendering if no user

  return (
   <nav className="navbar">

  {/* LEFT SIDE */}
  <div className="nav-left">

    <button className="arrow-btn" onClick={() => navigate(-1)}>←</button>

    <div className="logo" onClick={() => navigate("/customer/dashboard")}>
      <img src={logo} alt="LocalBiz Connect" />
      <span>LocalBiz Connect</span>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <ul className="nav-links">

    <li onClick={() => navigate("/customer/home")}>Home</li>

    <li onClick={() => navigate("/customer/about")}>About us</li>

    <li onClick={() => navigate("/customer/contact")}>Contact</li>

    <li className="profile" onClick={() => navigate("/customer/dashboard")}>
      👤 {user.name}
    </li>

    {/* 👉 RIGHT ARROW */}
    <li>
      <button className="arrow-btn" onClick={() => navigate(1)}>→</button>
    </li>

  </ul>

</nav>
  );
}

export default CustomerNavbar;