import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import GoalPage from './Components/GoalPage'
import TrackerPage from './Components/TrackerPage'
import WeightTracker from './Components/WeightTracker'
import ChallengePage from './Components/ChallengePage'
import ChallengeDetail from './Components/ChallengeDetail'
import MonthlyFoodTracker from './Components/MonthlyFoodTracker'
import Dashboard from './Components/Dashboard'




function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/goal" element={<GoalPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/weight-tracker" element={<WeightTracker />} />
        <Route path="/challenge/" element={<ChallengePage />} />
        <Route path="/challenge/:challengeId" element={<ChallengeDetail />} />
        <Route path="/food" element={<MonthlyFoodTracker />} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </Router>
     
    </>
  )
}

export default App
