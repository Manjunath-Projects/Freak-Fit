import React from 'react';
import { Link } from 'react-router-dom';
import challenges from '../data/challenges';
import './ChallengePage.css';

const ChallengeListPage = () => {
  return (
    <div className="challenge-page">
      <div className="header">FITNESS CHALLENGES</div>
      <div className="challenge-grid">
        {challenges.map(c => (
          <Link
            to={`/challenge/${c.id}`}
            key={c.id}
            className="challenge-card"
            style={{ borderColor: c.color, textDecoration: 'none' }}
          >
            <div className="icon" style={{ backgroundColor: c.color }}>{c.icon}</div>
            <h3>{c.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChallengeListPage;
