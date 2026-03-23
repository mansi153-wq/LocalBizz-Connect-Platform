import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, [navigate]);

  // ================= EDIT HANDLER =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    if (!formData.id) {
      alert("User not loaded properly. Please login again.");
      return;
    }

    const res = await fetch("http://localhost:3000/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: formData.id,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(formData));
      setUser(formData);
      setIsEditing(false);
      alert("Profile updated!");
    } else {
      alert(data.message);
    }
  };

  // ================= PASSWORD =================
  const handlePasswordChange = async () => {
    if (!formData.id) {
      alert("User not loaded properly.");
      return;
    }

    const res = await fetch("http://localhost:3000/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: formData.id,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Password updated!");
      setShowPassword(false);
      setPasswordData({ oldPassword: "", newPassword: "" });
    } else {
      alert(data.message);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        {/* ================= PROFILE INFO ================= */}
        <div className="profile-info">

          <div className="profile-row">
            <span>Name</span>
            {isEditing ? (
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.name}</span>
            )}
          </div>

          

          <div className="profile-row">
            <span>Mobile</span>
            {isEditing ? (
              <input
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.mobile || "Not Provided"}</span>
            )}
          </div>

        </div>

        {/* ================= BUTTONS (CLEAN ROW) ================= */}
        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}

          <button onClick={() => setShowPassword(!showPassword)}>
            Change Password
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* ================= PASSWORD BOX ================= */}
        {showPassword && (
          <div className="password-box">
            <input
              type="password"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })
              }
            />
            <button onClick={handlePasswordChange}>
              Update Password
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyProfile;