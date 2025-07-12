import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add any additional logout logic here (e.g., clearing tokens, etc.)
  };

  return (
    <Router>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={<Navigate to="/profile" replace />} />
      </Routes>

      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={
                isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Login onLoginSuccess={() => setIsLoggedIn(true)} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <SignUp />
              } 
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