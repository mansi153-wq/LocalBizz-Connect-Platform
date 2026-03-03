
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
 

const login = async () => {
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem("customer_id", data.customer_id);
      localStorage.setItem("customer_name", data.name);
     navigate("/customer/dashboard");
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
            required
            placeholder="Enter your email "
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <label>Password</label>
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
