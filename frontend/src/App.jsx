
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import apiService from './services/api';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        setIsLoggedIn(true);
        // Update API service token
        apiService.token = token;
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await apiService.logout();
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Authentication routes - full screen without navbar */}
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to="/" replace /> : 
            <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />
        
        <Route 
          path="/register" 
          element={
            isLoggedIn ? 
            <Navigate to="/" replace /> : 
            <SignUp onRegisterSuccess={handleLoginSuccess} />
          } 
        />
        
        {/* Main application routes - with navbar */}
        <Route 
          path="/*" 
          element={
            <div className="app-container">
              <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              <div className="main-content">
                <Routes>
                  {/* Root route - Home page (accessible to everyone) */}
                  <Route 
                    path="/" 
                    element={<Home isLoggedIn={isLoggedIn} />}
                  />
                  
                  {/* Protected routes - require authentication */}
                  <Route 
                    path="/profile" 
                    element={
                      isLoggedIn ? 
                      <UserProfile /> : 
                      <Navigate to="/login?returnTo=/profile" replace />
                    } 
                  />
                  
                  <Route 
                    path="/dashboard" 
                    element={
                      isLoggedIn ? 
                      <div>Dashboard Page (Coming Soon)</div> : 
                      <Navigate to="/login?returnTo=/dashboard" replace />
                    } 
                  />
                  
                  <Route 
                    path="/skills" 
                    element={
                      isLoggedIn ? 
                      <div>Skills Page (Coming Soon)</div> : 
                      <Navigate to="/login?returnTo=/skills" replace />
                    } 
                  />
                  
                  {/* Catch all route - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App; 