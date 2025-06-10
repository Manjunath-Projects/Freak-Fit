import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import loginBg from '../assets/login-bg.jpeg';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5090/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); // Redirect after login
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="header"><span>FREAK-FIT!!!</span></div>
      <div className="form-container">
        <h2>Login</h2>
        <input className="hello" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="hello" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="Sub" onClick={handleLogin}>Login</button>
        <p className="link" onClick={() => navigate('/register')}>New User? Register here</p>
      </div>
    </div>
  );
}

export default LoginPage;
