
import React, { useState } from "react";
import "./AdminDashboard.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { _id: "u1", name: "Alice", email: "alice@example.com", role: "user" },
    { _id: "u2", name: "Bob", email: "bob@example.com", role: "user" }
  ]);
  const [trainers, setTrainers] = useState([
    { _id: "t1", name: "Trainer Tom", email: "tom@fit.com", role: "trainer" },
    { _id: "t2", name: "Coach Kim", email: "kim@fit.com", role: "trainer" }
  ]);

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "user") setUsers(users.filter((u) => u._id !== id));
      else setTrainers(trainers.filter((t) => t._id !== id));
    }
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Active Users",
        data: [2, 4, 6, 5, 8],
        fill: true,
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        borderColor: "#60a5fa",
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#60a5fa",
        pointHoverRadius: 6,
        pointRadius: 4,
      }
    ]
  };

  const doughnutData = {
    labels: ["Users", "Trainers"],
    datasets: [
      {
        label: "Count",
        data: [users.length, trainers.length],
        backgroundColor: ["#34d399", "#f472b6"],
        borderColor: ["#059669", "#be185d"],
        borderWidth: 2,
        hoverOffset: 12
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <h1>🛠️ Admin Dashboard</h1>

      <div className="charts">
        <div className="chart-card">
          <h3>📈 User Growth</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-card">
          <h3>📊 User vs Trainer Distribution</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      <div className="section">
        <h2>👥 Users</h2>
        <div className="card-grid">
          {users.map((user) => (
            <div className="admin-card" key={user._id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <button onClick={() => handleDelete("user", user._id)}>🗑 Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>🏋️‍♂️ Trainers</h2>
        <div className="card-grid">
          {trainers.map((trainer) => (
            <div className="admin-card" key={trainer._id}>
              <h3>{trainer.name}</h3>
              <p>{trainer.email}</p>
              <button onClick={() => handleDelete("trainer", trainer._id)}>🗑 Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
