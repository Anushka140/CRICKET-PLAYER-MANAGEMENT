import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teams from './pages/Teams';
import Players from './pages/Players';  // Import Players page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Teams />} />
        <Route path="/players" element={<Players />} />  {/* Add route for Players */}
      </Routes>
    </Router>
  );
}

export default App;
