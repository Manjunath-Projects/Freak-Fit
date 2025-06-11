import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import profileImage from '../assets/IMG_5309.JPG';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userName, setUsername] = useState("Guest");
  const [userAge, setUserAge] = useState(0);
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);

  
  useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await fetch('http://localhost:5090/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!res.ok) throw new Error('Failed to fetch user data');

      const data = await res.json();

      setUsername(data.name || 'Guest');
      setUserAge(data.age ?? 0);
      setUserHeight(data.height ?? 0);
      setUserWeight(data.weight ?? 0);

    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  fetchUserData();
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-main">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome Back 🎉</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button className="nav-button" onClick={() => navigate('/goal')}>🏃 BMI-Genration</button>
          <button className="nav-button" onClick={() => navigate('/tracker')}>🙋 Calorie-Tracker </button>
          <button className="nav-button" onClick={() => navigate('/weight-tracker')}>🏋Weight-tracker</button>
          <button className="nav-button" onClick={() => navigate('/food')}>🍽️ Food Tracker</button>
          <button className="nav-button" onClick={() => navigate('/challenge')}>🏆 Challenges</button>
        </div>

        <div className="card-grid">
          <Card label="Steps" value="2,500 Steps" subtext="50% of your goal" />
          <Card label="Water" value="1.25 Liters" subtext="Daily intake" />
          <Card label="Calories" value="Under" subtext="Today" />
          <Card label="Heart Rate" value="110 bpm" subtext="Current" />
        </div>

        <div className="chart-grid">
          <ChartCard title="Weekly Activity">
            <Bar
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                  label: 'Steps',
                  data: [3000, 4000, 3500, 5000, 7500, 2000, 1000],
                  backgroundColor: '#4F46E5',
                }],
              }}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
                maintainAspectRatio: false,
              }}
            />
          </ChartCard>

          <ChartCard title="Workout Breakdown">
            <Doughnut
              data={{
                labels: ['Cardio', 'Stretching', 'Treadmill', 'Strength'],
                datasets: [{
                  data: [30, 40, 30, 20],
                  backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
                }],
              }}
              options={{ plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false }}
            />
          </ChartCard>

          <ChartCard title="Muscle Group Breakdown">
            <Doughnut
              data={{
                labels: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders'],
                datasets: [{
                  data: [20, 25, 30, 15, 10],
                  backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#66bb6a', '#ab47bc'],
                }],
              }}
              options={{ plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false }}
            />
          </ChartCard>
        </div>

        <div className="goals-grid">
          <div className="goal-card">
            <h2 className="chart-title">Your Goals</h2>
            <Goal label="Running" value={79} />
            <Goal label="Sleeping" value={60} />
            <Goal label="Weight Loss" value={60} />
          </div>

          <div className="goal-progress">
            <h2 className="chart-title">Monthly Progress</h2>
            <p className="progress-percentage">80%</p>
            <p className="progress-note">You have achieved 80% of your goal this month</p>
          </div>
        </div>
      </div>

      <div className="profile-sidebar-wrapper">
        <div className="profile-sidebar">
          <div className="profile-card">
            <img src={profileImage} alt="Profile" className="profile-pic" />
            <h3 className="profile-name">{userName}</h3>
            <p className="profile-detail">Age: {userAge}</p>
            <p className="profile-detail">Height: {userHeight} cm</p>
            <p className="profile-detail">Weight: {userWeight} kg</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={() => setShowEditModal(true)} className="profile-action-button">✏️ Edit</button>
              <button onClick={() => setShowLogoutConfirm(true)} className="profile-action-button logout">🚪 Logout</button>
            </div>
          </div>

          <div className="profile-section">
            <h4 className="section-title">Your Goals</h4>
            <ul className="section-list">
              <li>🏃 Run 3x/week</li>
              <li>💧 3L water/day</li>
              <li>🍎 1800 kcal diet</li>
            </ul>
          </div>

          <div className="profile-section">
            <h4 className="section-title">Scheduled Activities</h4>
            <ul className="section-list">
              <li>🧘 Yoga - 7 AM</li>
              <li>🏋️ Gym - 6 PM</li>
              <li>🚴 Cycling - Sunday</li>
            </ul>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Profile (Coming Soon)</h2>
            <button onClick={() => setShowEditModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to logout?</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={handleLogout} className="confirm-btn">Yes, Logout</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="close-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ label, value, subtext }) => (
  <div className="info-card">
    <div className="info-label">{label}</div>
    <div className="info-value">{value}</div>
    <div className="info-subtext">{subtext}</div>
  </div>
);

const Goal = ({ label, value }) => (
  <div className="goal-item">
    <div className="goal-label">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="goal-bar">
      <div className="goal-fill" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h2 className="chart-title">{title}</h2>
    {children}
  </div>
);

export default Dashboard;