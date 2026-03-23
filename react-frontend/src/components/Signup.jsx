import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import signupImage from "../assets/signup.jpg";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  // ===== Validation Helpers =====
  const validateName = v =>
    /^[A-Za-z ]{3,}$/.test(v) ? '' : 'Name must be at least 3 letters';

  const validateEmail = v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter valid email';

  const validatePassword = v =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
      ? ''
      : '8+ chars with A–Z, a–z, 0–9';

  const validateMobile = v =>
    /^[0-9]{10}$/.test(v) ? '' : 'Enter 10 digit mobile';

  // ===== Handlers =====
  const handleName = e => {
    const v = e.target.value;
    setName(v);
    setErrors(p => ({ ...p, name: validateName(v) }));
  };

  const handleEmail = e => {
    const v = e.target.value;
    setEmail(v);
    setErrors(p => ({ ...p, email: validateEmail(v) }));
  };

  const handlePassword = e => {
    const v = e.target.value;
    setPassword(v);
    setErrors(p => ({ ...p, password: validatePassword(v) }));
  };

  const handleMobile = e => {
    const v = e.target.value.replace(/\D/g, '');
    setMobile(v);
    setErrors(p => ({ ...p, mobile: validateMobile(v) }));
  };

  // ===== Signup =====
  const signup = async () => {

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      mobile: validateMobile(mobile)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(e => e)) return;

    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, mobile })
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.status === 200) {
        setShowOtp(true); // ✅ Only show OTP here
      }

    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  // ===== OTP =====
  const verifyOtp = async () => {

    if (!/^[0-9]{4,6}$/.test(otp)) {
      setMessage('OTP must be 4–6 digits');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      setMessage(data.message);

      // ✅ SUCCESS FLOW HERE
      if (res.ok) {
        alert("Customer Successfully Registered!");
        navigate("/customer/dashboard");
      }

    } catch (err) {
      setMessage("OTP verification failed");
    }
  };

  return (
    <div className="signup-page">
    <div className="signup-container">

  {/* LEFT SIDE */}

    <div className="signup-text">
      <h1>Customer Signup</h1>
      <p>
        Welcome to your new favorite place 💫  <br></br>
Find what you need, when you need it,  
all in just a few clicks.
        Join us today ✨ <br />
        Discover amazing services, book easily, and enjoy a seamless experience.
      </p>
    </div>

  

  {/* RIGHT SIDE */}
  <div className="signup-card">
    <h2>Customer Signup</h2>

          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Enter your Name"
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="Enter your Email ID"
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Enter valid password"
            />
            {errors.password && <small className="error">{errors.password}</small>}
          </div>

          <div className="input-group">
            <input
              type="text"
              value={mobile}
              onChange={handleMobile}
              maxLength="10"
              placeholder="Enter Mobile number"
            />
            {errors.mobile && <small className="error">{errors.mobile}</small>}
          </div>

          <button className="primary-btn2" onClick={signup}>
            Click here to sent OTP         </button>

          <button
            className="secondary-bt"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </button>

          {showOtp && (
            <div className="otp-section">
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength="6"
                placeholder="Enter OTP"
              />

              <button
                className="primary-btn"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
            </div>
          )}

          <p className="message">{message}</p>

        </div>
      </div>
    </div>
  );
}

export default Signup;