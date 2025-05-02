import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HelpPage from './components/HelpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/help/:page" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;