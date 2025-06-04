import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import loginBg from '../assets/login-bg.jpeg';

function LoginPage() {
  const navigate = useNavigate();
  
  return (
    <>
    <div className="page" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="header">
       <span>FREAK-FIT!!!</span> 
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <input class="hello" type="text" placeholder="Username" />
        <input class="hello" type="password" placeholder="Password" />
        <button class="Sub" onClick={() => navigate('/goal')}>Login</button>
        <p className="link" onClick={() => navigate('/register')}>New User? Register here</p>
      </div>
    </div>
    </>
  );
}

export default LoginPage;