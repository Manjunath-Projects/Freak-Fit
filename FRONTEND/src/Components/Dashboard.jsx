import React from 'react';
import './Dashboard.css';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import profileImage from '../assets/IMG_5309.JPG';

const Dashboard = () => {
  return (
    <div className="dashboard-main">
      {/* LEFT: Dashboard */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome Back 🎉</h1>

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

      {/* RIGHT: User Profile Sidebar */}
      <div className="profile-sidebar">
      <img src={profileImage} alt="Profile" className="profile-pic" />

        <h3 className="profile-name">Your name</h3>
        <p className="profile-detail">Age: 0 </p>
        <p className="profile-detail">Height: 0 cm</p>
        <p className="profile-detail">Weight: 0 kg</p>

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
