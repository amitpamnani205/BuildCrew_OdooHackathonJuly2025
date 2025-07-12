import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add any additional logout logic here (e.g., clearing tokens, etc.)
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} 
            />
            <Route 
              path="/" 
              element={<Home isLoggedIn={isLoggedIn} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 