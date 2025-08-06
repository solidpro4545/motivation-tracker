// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tracker from './Tracker';
import LoginPage from './Login'; // <-- Make sure this file exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  );
}

export default App;
