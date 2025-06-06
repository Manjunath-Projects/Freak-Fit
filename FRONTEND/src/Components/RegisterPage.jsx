import React, { useState } from 'react';
import '../App.css';
import registerBg from '../assets/register-bg.jpeg';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch('http://localhost:5050/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! You can now log in.");
        navigate('/login');
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${registerBg})` }}>
      <div className="header">
        <span>FREAK OUT!!!!!!!</span>
      </div>
      <div className="form-container">
        <h3>New User</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input className="hello" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input className="hello" type="date" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} /><br />
        <input className="hello" type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input className="hello" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input className="hello" type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} /><br />
        <button className="Sub" onClick={handleRegister}>Submit</button>
      </div>
    </div>
  );
}

export default RegisterPage;
