import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorSignup.css";

function VendorLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Both fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/vendor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // ⭐ VERY IMPORTANT — clear old vendor session first
        localStorage.clear();

        // store new logged in vendor
        localStorage.setItem("vendor_id", data.vendor_id);
        localStorage.setItem("shopName", data.shopName);

        navigate("/vendor/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Vendor Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/vendor/signup")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default VendorLogin;
