import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorSignup.css";
import vendorimage from "../assets/vendor.webp";

function VendorSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    shopLogo: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let logoBase64 = null;
    if (form.shopLogo instanceof File) {
      logoBase64 = await convertToBase64(form.shopLogo);
    }

    try {
      const res = await fetch("http://localhost:5000/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopName: form.shopName,
          ownerName: form.ownerName,
          email: form.email,
          password: form.password,
          mobile: form.mobile,
          shop_logo: logoBase64,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Vendor registered successfully!");
        navigate("/vendor/dashboard");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, try again later.");
    }
  };

  return (
    <div className="auth-layout">

      {/* LEFT IMAGE SIDE */}
      <div className="text-side">
        <img src={vendorimage} alt="vendor" className="side-image" />
      </div>

      {/* RIGHT PHONE SIDE */}
      <div className="phone-side">
        <div className="phone-frame">
          <div className="signup-card">
           
            {error && <p className="error">{error}</p>}
             <div className="form-group">
              <label>Shop Logo</label>
              <input type="file" name="shopLogo" accept="image/*" onChange={handleChange}/>
            </div>
            <input name="shopName" placeholder="Shop / Business Name" onChange={handleChange}/>
            <input name="ownerName" placeholder="Owner Name" onChange={handleChange}/>
            <input name="email" type="email" placeholder="Email" onChange={handleChange}/>
            <input name="mobile" placeholder="Mobile Number" maxLength="10" onChange={handleChange}/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange}/>

           

            <button className="primary-btn" onClick={handleSignup}>
              Register
            </button>

            <button className="secondary-btn" onClick={()=>navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default VendorSignup;
