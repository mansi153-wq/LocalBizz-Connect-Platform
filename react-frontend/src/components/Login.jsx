import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {

    // ✅ Manual validation (since no form)
    if (!email.trim() || !password.trim()) {
      setMessage("All fields are required *");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("user", JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          mobile: data.mobile
        }));
         alert("Login Successful!");

      navigate("/customer/dashboard", { replace: true });

      } else {
        setMessage(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Customer Login</h2>

        <div className="input-group">
       
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email *"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password *"
          />
        </div>

        <button className="primary-btn" onClick={login}>
          Login
        </button>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Login;