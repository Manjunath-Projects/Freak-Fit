import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import './ChallengePage.css';

const challengeDetails = [
  {
    title: "30 Days No Sugar",
    icon: "🍬",
    color: "#ff4d4d",
    rules: [
      "Avoid all forms of sugar.",
      "No sweetened drinks or snacks.",
      "Check labels for hidden sugars.",
      "No desserts or candies allowed."
    ]
  },
  {
    title: "75 Hard Challenge",
    icon: "💪",
    color: "#ffa534",
    rules: [
      "Work out twice a day.",
      "Drink a gallon of water.",
      "Read 10 pages.",
      "Follow a diet with no cheat meals.",
      "Take a daily progress picture."
    ]
  },
  {
    title: "30 Days No Carbs",
    icon: "🌾",
    color: "#4dc3ff",
    rules: [
      "Avoid all bread, pasta, and grains.",
      "Stick to protein and vegetables."
    ]
  },
  {
    title: "30 Days No Alcohol",
    icon: "🍺",
    color: "#ff4d4d",
    rules: [
      "No alcohol consumption allowed.",
      "Avoid social drinking situations."
    ]
  },
  {
    title: "30 Days No Junk Food",
    icon: "🍔",
    color: "#ffa534",
    rules: [
      "No fast food, chips, or candy.",
      "Plan healthy meals in advance."
    ]
  },
  {
    title: "30 Days No Social Media",
    icon: "📱",
    color: "#4dc3ff",
    rules: [
      "Do not use Instagram, Facebook, TikTok, etc.",
      "Uninstall distracting apps."
    ]
  },
  {
    title: "30 Days No Soda",
    icon: "🥤",
    color: "#ff4d4d",
    rules: [
      "Avoid all carbonated beverages.",
      "Replace with water or herbal teas."
    ]
  },
  {
    title: "30 Days No Processed Food",
    icon: "🍽️",
    color: "#ffa534",
    rules: [
      "Eat whole, fresh foods only.",
      "Cook your meals at home."
    ]
  },
  {
    title: "30 Days No Eating After 8 PM",
    icon: "⏰",
    color: "#4dc3ff",
    rules: [
      "Do not consume food after 8 PM.",
      "Eat an early dinner to stay full."
    ]
  }
];

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const id = parseInt(challengeId);
  const challenge = challengeDetails[id];

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(`challenge_${id}_progress`);
    return saved ? JSON.parse(saved) : Array(30).fill(false);
  });

  const [showConfetti, setShowConfetti] = useState(false);

  const toggleDay = (index) => {
    const updated = [...progress];
    updated[index] = !updated[index];
    setProgress(updated);
  };

  useEffect(() => {
    const allCompleted = progress.every(Boolean);
    setShowConfetti(allCompleted);
    localStorage.setItem(`challenge_${id}_progress`, JSON.stringify(progress));
  }, [progress, id]);

  const clearAll = () => {
    const cleared = Array(30).fill(false);
    setProgress(cleared);
  };

  const saveProgress = () => {
    localStorage.setItem(`challenge_${id}_progress`, JSON.stringify(progress));
    alert('Progress saved!');
  };

  return (
    <div className="challenge-detail" style={{ minHeight: '100vh', padding: '4rem 2rem', color: 'white', backgroundColor: '#121212', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative' }}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={800} />}
      <h1 style={{ color: challenge.color, textAlign: 'center', fontSize: '3rem' }}>{challenge.icon} {challenge.title}</h1>
      <div style={{ margin: '1rem auto', maxWidth: '800px', fontFamily: 'Segoe UI, sans-serif', fontSize: '1.1rem', lineHeight: '1.6' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Rules:</h3>
        <ul>
          {challenge.rules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>
      </div>
      <div className="checklist-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1.5rem', margin: '2rem auto', maxWidth: '800px' }}>
        {progress.map((completed, index) => (
          <label key={index} className="check-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1e1e1e', padding: '0.75rem', borderRadius: '0.5rem' }}>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleDay(index)}
            />
            Day {index + 1}
          </label>
        ))}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={clearAll} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}>Clear All</button>
        <button onClick={saveProgress} style={{ backgroundColor: '#4dc3ff', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}>Save</button>
      </div>
    </div>
  );
};

export default ChallengeDetail;
