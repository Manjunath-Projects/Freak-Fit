import React, { useState } from "react";
import "./TrainerDashboard.css";

const sampleUsers = [
  { _id: "1", name: "Alice", email: "alice@example.com", goals: ["Fat Loss"] },
  { _id: "2", name: "Bob", email: "bob@example.com", goals: ["Muscle Gain"] },
  { _id: "3", name: "Charlie", email: "charlie@example.com", goals: ["Endurance", "Mobility"] },
];

const TrainerDashboard = () => {
  const [suggestions, setSuggestions] = useState({});

  const handleChange = (userId, field, value) => {
    setSuggestions((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value
      }
    }));
  };

  const sendSuggestion = (userId) => {
    const { workout, diet } = suggestions[userId] || {};
    if (!workout || !diet) return alert("Please fill in both workout and diet.");
    alert(`💪 Sent to ${userId}:\nWorkout: ${workout}\nDiet: ${diet}`);
  };

  return (
    <div className="trainer-dashboard">
      <h1>🗿Trainer Dashboard</h1>
      <div className="user-grid">
        {sampleUsers.map((user) => (
          <div className="user-card" key={user._id}>
            <h3>👤 {user.name}</h3>
            <p>📧 {user.email}</p>
            <p>🎯 Goals: {user.goals.join(", ")}</p>

            <textarea
              placeholder="🏋️ Workout Plan"
              value={suggestions[user._id]?.workout || ""}
              onChange={(e) => handleChange(user._id, "workout", e.target.value)}
            />
            <textarea
              placeholder="🥗 Diet Plan"
              value={suggestions[user._id]?.diet || ""}
              onChange={(e) => handleChange(user._id, "diet", e.target.value)}
            />

            <button onClick={() => sendSuggestion(user._id)}>Send Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerDashboard;
