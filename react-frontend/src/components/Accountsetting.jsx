import { useEffect, useState } from "react";
import "./Accountsetting.css";

function AccountSettings() {
  const vendor_id = localStorage.getItem("vendor_id");

  const [vendor, setVendor] = useState({
    shop_name: "",
    owner_name: "",
    email: "",
    phone: "",
    shop_logo: "",
    created_at: ""
  });

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/vendor/profile/${vendor_id}`);
        const data = await res.json();
        if (data.success) setVendor(data.vendor);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, [vendor_id]);

  const handleProfileChange = (e) =>
    setVendor({ ...vendor, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => setLogoFile(e.target.files[0]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const saveProfile = async () => {
    try {
      let logoBase64 = vendor.shop_logo;
      if (logoFile) logoBase64 = await convertToBase64(logoFile);

      const res = await fetch(`http://localhost:5000/vendor/update-profile/${vendor_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...vendor, shop_logo: logoBase64 })
      });

      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("shopLogo", logoBase64);
        setVendor({ ...vendor, shop_logo: logoBase64 });
      } else alert(data.error);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const changePassword = async () => {
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/vendor/change-password/${vendor_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.newPass
        })
      });

      const data = await res.json();
      if (data.success) {
        alert("Password updated successfully!");
        setPasswords({ current: "", newPass: "", confirm: "" });
      } else alert(data.error);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="account-page">

      {/* Top Vendor Logo */}
      <div className="vendor-logo">
        {vendor.shop_logo && <img src={vendor.shop_logo} alt="Shop Logo" />}
      </div>

      <h2 className="page-title">Account Settings</h2>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">

        {/* PROFILE CARD */}
        <div className="card">
          <h3>Profile Information</h3>

          <div className="logo-preview">
            {vendor.shop_logo && <img src={vendor.shop_logo} alt="Shop Logo" />}
          </div>

          <input type="file" accept="image/*" onChange={handleLogoChange} />

          <input
            name="shop_name"
            value={vendor.shop_name}
            onChange={handleProfileChange}
            placeholder="Shop Name"
          />

          <input
            name="owner_name"
            value={vendor.owner_name}
            onChange={handleProfileChange}
            placeholder="Owner Name"
          />

          <input name="email" value={vendor.email} disabled />

          <input
            name="phone"
            value={vendor.phone}
            onChange={handleProfileChange}
            placeholder="Phone"
          />

          <button onClick={saveProfile}>Save Profile</button>
        </div>

        {/* PASSWORD CARD */}
        <div className="card">
          <h3>Change Password</h3>

          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={passwords.current}
            onChange={handlePasswordChange}
          />

          <input
            type="password"
            name="newPass"
            placeholder="New Password"
            value={passwords.newPass}
            onChange={handlePasswordChange}
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
          />

          <button onClick={changePassword}>Update Password</button>
        </div>

        {/* SUMMARY CARD */}
        <div className="card">
          <h3>Account Summary</h3>
          <p><strong>Vendor ID:</strong> {vendor_id}</p>
          <p><strong>Account Created:</strong> {vendor.created_at}</p>
        </div>

      </div>
    </div>
  );
}

export default AccountSettings;
