import React, { useState} from 'react';
import '../App.css';
import goalBg from '../assets/goal-bg.jpeg';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import { useLocation } from 'react-router-dom';

function GoalPage() {
const location = useLocation();
  const {
    age: initialAge = '',
    height: initialHeight = '',
    weight: initialWeight = ''
  } = location.state || {};

const [age, setAge] = useState(initialAge);
  const [height, setHeight] = useState(initialHeight);
  const [weight, setWeight] = useState(initialWeight);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('Beginner');

  const calculateMetrics = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter valid height, weight, and age.',
        background: '#1f1f2e',
        color: 'white',
        confirmButtonColor: '#6366f1',
      });
      return;
    }

    const heightInMeters = h / 100;
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(2);

    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const activityMap = {
      Beginner: 1.2,
      Intermediate: 1.55,
      Advanced: 1.725,
    };

    const maintenanceCalories = Math.round(bmr * (activityMap[activity] || 1.2));
    const weightLossCalories = maintenanceCalories - 500;
    const weightGainCalories = maintenanceCalories + 500;

    Swal.fire({
      title: '📊 Your Results',
      html: `
        ✅ <b>BMI:</b> ${bmi}<br/>
        🔥 <b>Maintenance Calories:</b> ${maintenanceCalories} kcal/day<br/>
        📉 <b>Weight Loss Calories:</b> ${weightLossCalories} kcal/day<br/>
        📈 <b>Weight Gain Calories:</b> ${weightGainCalories} kcal/day
      `,
      icon: 'info',
      confirmButtonText: 'Got it!',
      background: 'black',
      color: 'white',
      confirmButtonColor: ' #ffde59',
    });
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${goalBg})` }}>
      <div className="header">
        <span>FREAKY GOAL!!!!</span>
        <div className="profile" >🏋️
        <span>USER</span>
        </div>
      </div>

      {/* <div className="dropdown">
        <select>
          <option>HOME</option>
          <option>GYM</option>
        </select>
      </div> */}

      <div className="form-container">
        <h2>BMI & Calorie Calculator</h2>
        <input className="hello" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input className="hello" type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
        <input className="hello" type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <select className="btn" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select className="btn" value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option>Weight Loss</option>
          <option>Weight Gain</option>
          <option>Maintenance</option>
        </select>

        <button className="Sub" onClick={calculateMetrics}>Submit</button>
      </div>
    </div>
  );
}

export default GoalPage;
