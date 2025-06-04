import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeListPage from './pages/ChallengeListPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChallengeListPage />} />
        <Route path="/challenge/:id" element={<ChallengeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
