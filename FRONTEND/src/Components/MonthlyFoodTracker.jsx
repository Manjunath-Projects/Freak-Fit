import React, { useState } from 'react';
import '../App.css';

function MonthlyFoodTracker() {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const [logs, setLogs] = useState(() => {
    const initialLogs = {};
    daysInMonth.forEach(day => {
      initialLogs[day] = {
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: ''
      };
    });
    return initialLogs;
  });

  const handleMealChange = (day, meal, value) => {
    setLogs(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value
      }
    }));
  };

  const mealPlaceholders = {
    breakfast: '🍳 Log your breakfast...',
    lunch: '🍛 Log your lunch...',
    dinner: '🍽️ Log your dinner...',
    snacks: '🍫 Log your snacks...'
  };

  return (
    <div className="page" style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white', padding: '2rem' }}>
      <div className="header" style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🗓️ 30-Day Meal Tracker</h1>
      </div>

      <div className="day-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        {daysInMonth.map(day => (
          <div
            key={day}
            className="tracker-card"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
              width: '100%',
              maxWidth: '500px',
              flex: '1 1 500px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              margin: '0 auto'
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem', textAlign: 'center' }}>Day {day}</h3>
            {['breakfast', 'lunch', 'dinner', 'snacks'].map(meal => (
              <div key={meal} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '500', width: '100%' }}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</label>
                <textarea
                  value={logs[day][meal]}
                  onChange={e => handleMealChange(day, meal, e.target.value)}
                  placeholder={mealPlaceholders[meal]}
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    resize: 'vertical',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyFoodTracker;