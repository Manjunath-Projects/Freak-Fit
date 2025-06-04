import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import challenges from '../data/challenges';
import './ChallengePage.css';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const challenge = challenges.find(c => c.id === id);
  const [checklist, setChecklist] = useState(Array(30).fill(false));

  const toggleDay = (i) => {
    const updated = [...checklist];
    updated[i] = !updated[i];
    setChecklist(updated);
  };

  if (!challenge) return <div>Challenge not found</div>;

  return (
    <div className="challenge-detail-page">
      <Link to="/" className="back-button">← Back</Link>
      <div className="icon" style={{ backgroundColor: challenge.color }}>{challenge.icon}</div>
      <h2>{challenge.title}</h2>

      <div className="checklist">
        {checklist.map((checked, i) => (
          <label key={i} className="check-item">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleDay(i)}
            />
            Day {i + 1}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
