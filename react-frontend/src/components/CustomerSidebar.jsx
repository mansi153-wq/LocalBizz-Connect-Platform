import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaSearch, FaSignOutAlt, FaRegFileCode, FaProjectDiagram, FaAssistiveListeningSystems } from "react-icons/fa";
import "./CustomerSidebar.css";

function CustomerSidebar() {
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("user"); // 🔥 better than clear()
  navigate("/login", { replace: true });
};

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Customer</h2>

      <NavLink to="/customer/dashboard" className="sidebar-link">
        <FaHome /> <span>Dashboard</span>
      </NavLink>
      
      <NavLink to="/customer/explore" className="sidebar-link">
        <FaSearch /> <span>Explore</span>
      </NavLink>

      <NavLink to="/customer/orders" className="sidebar-link">
        <FaBox /> <span>Orders</span>
      </NavLink>

        <NavLink to="/customer/profile" className="sidebar-link">
        <FaAssistiveListeningSystems /> <span>Profile</span>
      </NavLink>

      <button className="sidebar-link logout" onClick={logout}>
        <FaSignOutAlt /> <span>Logout</span>
      </button>

    </div>
  );
}

export default CustomerSidebar;