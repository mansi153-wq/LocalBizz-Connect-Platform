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
    address: "",
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
    // Email validation for specific domains
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|in)$/;

    if (!emailPattern.test(form.email)) {
      setError("Enter Valid Email ");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let logoBase64 = null;
    if (form.shopLogo instanceof File) {
      logoBase64 = await convertToBase64(form.shopLogo);
    }

    // Shop name validation
if (form.shopName.trim() === "") {
  setError("Shop name is required");
  return;
}

// Owner name validation (letters only)
const namePattern = /^[A-Za-z ]+$/;
if (!namePattern.test(form.ownerName)) {
  setError("Owner name must contain only letters");
  return;
}

// Mobile number validation
const mobilePattern = /^[0-9]{10}$/;
if (!mobilePattern.test(form.mobile)) {
  setError("Mobile number must be exactly 10 digits");
  return;
}

// Password validation
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordPattern.test(form.password)) {
  setError(
    "Password must be at least 8 characters long and combination of numbers and alphabets and special characters "
  );
  return;
}

// Confirm password check
if (form.password !== form.confirmPassword) {
  setError("Passwords do not match");
  return;
}



    try {
      const res = await fetch("http://localhost:5000/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopName: form.shopName,
          ownerName: form.ownerName,
          email: form.email,
          address: form.address,
          password: form.password,
          mobile: form.mobile,
          shop_logo: logoBase64,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Vendor registered successfully!");
        navigate("/vendor/login");
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
  <div className="text-content">
    <h1>Vendor Registration </h1>
    <p>
      Grow your business with us 🚀 <br />
      Reach more customers, manage your shop easily, and boost your sales.
    </p>
  </div>

  <img src={vendorimage} alt="vendor" className="side-image" />
</div>
      {/* RIGHT PHONE SIDE */}
      <div className="phone-side">
        <div className="phone-frame">
          <div className="signup-cards">
           
            {error && <p className="error">{error}</p>}
            
            <input name="shopName" placeholder="Shop / Business Name" onChange={handleChange}/>
            <input name="ownerName" placeholder="Owner Name" onChange={handleChange}/>
            <input name="email" type="email" placeholder="Email" onChange={handleChange}/>
             <input name="address" placeholder="Address" onChange={handleChange}/>
            <input name="mobile" placeholder="Mobile Number" maxLength="10" onChange={handleChange}/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange}/>

           

            <button className="primary-btns" onClick={handleSignup}>
              Register
            </button>

            <button className="secondary-btns" onClick={()=>navigate("/vendor/login")}>
              Back to login
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default VendorSignup;
