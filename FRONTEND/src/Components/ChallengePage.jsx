import React from 'react';
import './ChallengePage.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const challenges = [
  { title: "30 Days No Sugar", icon: "🍬", color: "#ff4d4d" },
  { title: "75 Hard Challenge", icon: "💪", color: "#ffa534" },
  { title: "30 Days No Carbs", icon: "🌾", color: "#4dc3ff" },
  { title: "30 Days No Alcohol", icon: "🍺", color: "#ff4d4d" },
  { title: "30 Days No Junk Food", icon: "🍔", color: "#ffa534" },
  { title: "30 Days No Social Media", icon: "📱", color: "#4dc3ff" },
  { title: "30 Days No Soda", icon: "🥤", color: "#ff4d4d" },
  { title: "30 Days No Processed Food", icon: "🍽️", color: "#ffa534" },
  { title: "30 Days No Eating After 8 PM", icon: "⏰", color: "#4dc3ff" }
];

const ChallengePage = () => {
  const navigate = useNavigate();

  const handleChallengeClick = (index) => {
    Swal.fire({
      title: 'Are you ready?',
      text: `Do you want to start the "${challenges[index].title}" challenge?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, start!',
      cancelButtonText: 'No, not yet',
      background: '#121212',
      color: 'white',
      confirmButtonColor: challenges[index].color
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/challenge/${index}`);
      }
    });
  };

  return (
    <div className="challenge-page">
      <div className="header">FITNESS CHALLENGES</div>
      <div className="challenge-grid">
        {challenges.map((c, index) => (
          <div
            key={index}
            className="challenge-card"
            style={{ borderColor: c.color }}
            onClick={() => handleChallengeClick(index)}
          >
            <div className="icon" style={{ backgroundColor: c.color }}>{c.icon}</div>
            <h3>{c.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengePage;
