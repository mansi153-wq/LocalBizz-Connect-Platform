import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorLogin.css";
import logImage from "./login.png";

function VendorLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Both fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/vendor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

     if (data.success) {

  // store vendor session
 // ✅ store only vendor info, keep others safe
localStorage.setItem("vendor_id", data.vendor_id);
localStorage.setItem("shopName", data.shopName);

alert("Login Successful!");
navigate("/vendor/dashboard", { replace: true });

}
 else {
        setError(data.error || "Login failed");
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="vendor-login-page">

      <div className="vendor-login-container">

        {/* LEFT IMAGE */}
      <div className="vendor-login-image">

  <div className="login-text">
    <h1>Vendor Login</h1>
    <p>
      Welcome back 👋 <br />
      Manage your shop, track orders, and grow your business effortlessly.
    </p>
  </div>

  <img src={logImage} alt="Login visual" />

</div>

        {/* RIGHT FORM */}
        <div className="vendor-login-card">

          <h2>Vendor Login</h2>

          {error && <p className="vendor-login-error">{error}</p>}

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button className="vendor-login-primary-btn" onClick={handleLogin}>
            Login
          </button>

          <button
            className="vendor-login-secondary-btn"
            onClick={() => navigate("/vendor/signup")}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default VendorLogin;