import React from 'react';
import './TrainerWorkoutPlans.css';

import chest from '../assets/Chest.png'; 
import triceps from '../assets/Triceps.png';
import back from '../assets/Back.png';
import arms from '../assets/Arms.png';
import shoulders from '../assets/Shoulder.png';
import legs from '../assets/Legs.png';
import recovery from '../assets/REST.png';

const TrainerWorkoutPlans = () => {
  const workouts = [
    { day: 'Monday', title: 'Chest Day', image: chest, exercises: ['Bench Press', 'Incline Dumbbell Press', 'Chest Flyes'] },
    { day: 'Tuesday', title: 'Triceps Day', image: triceps, exercises: ['Tricep Dips', 'Skull Crushers', 'Cable Pushdowns'] },
    { day: 'Wednesday', title: 'Back & Lats', image: back, exercises: ['Pull-ups', 'Lat Pulldown', 'Barbell Row'] },
    { day: 'Thursday', title: 'Arms Day', image: arms, exercises: ['Bicep Curls', 'Hammer Curls', 'Preacher Curls'] },
    { day: 'Friday', title: 'Shoulders & Rear Delts', image: shoulders, exercises: ['Overhead Press', 'Lateral Raises', 'Reverse Pec Deck'] },
    { day: 'Saturday', title: 'Thighs & Calves', image: legs, exercises: ['Squats', 'Lunges', 'Calf Raises'] },
    { day: 'Sunday', title: 'Rest & Recovery', image: recovery, exercises: ['Stretching', 'Foam Rolling', 'Yoga'] },
  ];

  return (
    <div className="trainer-workout-container">
      <h1 className="trainer-workout-title">🏋️ Weekly Workout Plans</h1>
      <div className="trainer-workout-grid">
        {workouts.map((plan, idx) => (
          <div className="workout-card" key={idx}>
            <div className="workout-card-inner">
              <div className="workout-card-front">
                <img src={plan.image} alt={plan.title} className="workout-image" />
                <h3>{plan.day}</h3>
                <p>{plan.title}</p>
              </div>
              <div className="workout-card-back">
                <h4>{plan.title}</h4>
                <ul>
                  {plan.exercises.map((item, i) => (
                    <li key={i}> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerWorkoutPlans;
