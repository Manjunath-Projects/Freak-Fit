import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Swal from 'sweetalert2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function TrackerPage() {
  const [calories, setCalories] = useState(0);
  const [goalCalories, setGoalCalories] = useState(2400);
  const [water, setWater] = useState(0);
  const [goalWater, setGoalWater] = useState(3);
  const [history, setHistory] = useState([]);
  const hasShownCaloriesAlert = useRef(false);
  const hasShownWaterAlert = useRef(false);

  useEffect(() => {
    hasShownCaloriesAlert.current = false;
  }, [goalCalories]);

  useEffect(() => {
    hasShownWaterAlert.current = false;
  }, [goalWater]);

  useEffect(() => {
    if (calories >= goalCalories && !hasShownCaloriesAlert.current) {
      Swal.fire({
        icon: 'success',
        title: '🎉 Calorie Goal Reached!',
        text: `You've consumed your goal of ${goalCalories} calories!`,
        background: '#1f1f2e',
        color: 'white',
        confirmButtonColor: '#6366f1'
      });
      hasShownCaloriesAlert.current = true;
    }
    if (water >= goalWater && !hasShownWaterAlert.current) {
      Swal.fire({
        icon: 'success',
        title: '💧 Hydration Goal Reached!',
        text: `You've drunk ${goalWater} liters of water today!`,
        background: '#1f1f2e',
        color: 'white',
        confirmButtonColor: '#36a2eb'
      });
      hasShownWaterAlert.current = true;
    }
  }, [calories, water, goalCalories, goalWater]);

  useEffect(() => {
    setHistory(prev => [...prev.slice(-9), { calories, water, time: new Date().toLocaleTimeString() }]);
  }, [calories, water]);

  const chartData = {
    labels: history.map(h => h.time),
    datasets: [
      {
        label: 'Calories Consumed',
        data: history.map(h => h.calories),
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255,99,132,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#ff6384'
      },
      {
        label: 'Water Drank (L)',
        data: history.map(h => h.water),
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54,162,235,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#36a2eb'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'white', padding: 20, boxWidth: 12 }
      },
      title: {
        display: true,
        text: '📊 Daily Tracking Overview',
        color: 'white',
        font: { size: 18 }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  return (
    <div className="page tracker-page" style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white', paddingBottom: '2rem' }}>
      <div className="header" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>FREAKY TRACKER!!!!</span>
        <div className="profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="https://img.icons8.com/emoji/48/weight-lifter.png" alt="User" style={{ width: '36px', height: '36px' }} />
          <span style={{ fontWeight: '500' }}>USER</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="tracker-card">
          <h3>🍱 Food Tracker</h3>
          <p>Calories Consumed: {calories} / {goalCalories}</p>
          <input
            type="number"
            placeholder="Enter calories consumed"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Set calorie goal"
            value={goalCalories}
            onChange={(e) => setGoalCalories(Number(e.target.value))}
          />
        </div>

        <div className="tracker-card">
          <h3>💧 Water Tracker</h3>
          <p>Water Drank: {water} / {goalWater} L</p>
          <input
            type="number"
            placeholder="Enter water in liters"
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Set water goal (L)"
            value={goalWater}
            onChange={(e) => setGoalWater(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="tracker-card" style={{ margin: '2rem' }}>
        <h3>📈 Progress Graph</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem;
        }

        .tracker-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          color: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tracker-card input {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-size: 1rem;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          outline: none;
        }

        .tracker-card input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default TrackerPage;
