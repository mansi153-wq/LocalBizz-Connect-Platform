import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorSignup.css";

function VendorSignup() {
  const navigate = useNavigate();

  // ❌ removed address, city, description (not in DB)
  const [form, setForm] = useState({
  shopName: "",
  ownerName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  shopLogo: null, // ✅ new
});


  const [error, setError] = useState("");
  /*
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();

    // check passwords match
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
          password: form.password,
          mobile: form.mobile
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Vendor registered successfully!");

        // ⭐ IMPORTANT: store vendor info (fix for same dashboard issue)
        localStorage.clear();
        localStorage.setItem("vendor_id", data.vendor_id);
        localStorage.setItem("shopName", data.shopName);

        // redirect to dashboard
        navigate("/vendor/dashboard");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later.");
    }
  };
  */
  const handleChange = (e) => {
  const { name, value, files } = e.target;
  setForm({
    ...form,
    [name]: files ? files[0] : value,
  });
};
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
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
        shop_logo: logoBase64, // ✅ send logo
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Vendor registered successfully!");
      localStorage.clear();
      localStorage.setItem("vendor_id", data.vendor_id);
      localStorage.setItem("shopName", data.shopName);
      navigate("/vendor/dashboard");
    } else {
      setError(data.error || "Something went wrong");
    }
  } catch (err) {
    console.error(err);
    setError("Server error, try again later.");
  }
};



  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Vendor Registration</h2>

        {error && <p className="error">{error}</p>}

        <input name="shopName" placeholder="Shop / Business Name" onChange={handleChange} />
        <input name="ownerName" placeholder="Owner Name" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number" maxLength="10" onChange={handleChange} />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

        <button className="primary-btn" onClick={handleSignup}>
          Register as Vendor
        </button>

        <button className="secondary-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <div className="form-group">
  <label>Shop Logo (optional)</label>
  <input type="file" name="shopLogo" accept="image/*" onChange={handleChange} />

  {form.shopLogo && (
    <img
      src={URL.createObjectURL(form.shopLogo)}
      alt="logo preview"
      className="preview-img"
      style={{ width: "80px", height: "80px", marginTop: "10px", objectFit: "cover" }}
    />
  )}
</div>

      </div>
    </div>
  );
}

export default VendorSignup;
