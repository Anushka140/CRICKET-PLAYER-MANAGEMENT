import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teams from './pages/Teams';
import Players from './pages/Players';  // Correct import path with forward slashes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Teams />} />
        <Route path="/matches" element={<Matches />} />

        <Route path="/players" element={<Players />} />  {/* Add route for Players */}
      </Routes>
    </Router>
  );
}

export default App;
