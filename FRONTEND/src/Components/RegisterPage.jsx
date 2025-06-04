import React from 'react';
import '../App.css';
import registerBg from '../assets/register-bg.jpeg';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="page" style={{ backgroundImage: `url(${registerBg})` }}>
      <div className="header">
        <span>FREAK OUT!!!!!!!</span>
        <div className="profile">
          {/* <img src="https://img.icons8.com/emoji/48/weight-lifter.png" alt="User" />
          <span>USER</span> */}
        </div>
      </div>
      <div className="form-container">
        <h3>New User</h3>
        <input class="hello" type="text" placeholder="Name" /><br></br> 
        <input class="hello" type="date" placeholder="DOB" /><br></br>
        <input class="hello" type="email" placeholder="Email ID" />
        <input class="hello" type="password" placeholder="Password" />
        <input class="hello" type="password" placeholder="Confirm Password" />
        <button  className="Sub"   onClick={()=> navigate("/goal") }>Submit</button>
 
      </div>
    </div>
  );
}

export default RegisterPage;