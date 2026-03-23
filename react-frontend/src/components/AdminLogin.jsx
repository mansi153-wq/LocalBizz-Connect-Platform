import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";


function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
     localStorage.setItem("admin_id", data.admin_id);
navigate("/admin/dashboard", { replace: true });
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="admin-page">

      {/* LEFT IMAGE */}
     

      {/* LOGIN CARD */}
      <div className="admin-card">
        <h2>Admin Login</h2>
        <p className="subtitle">Welcome back, Admin 👋</p>

        <form onSubmit={handleLogin} className="admin-form">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>
      </div>

    </div>
  );
}

export default AdminLogin;