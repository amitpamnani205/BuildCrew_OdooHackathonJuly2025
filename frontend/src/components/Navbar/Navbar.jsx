import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const user = apiService.getStoredUser();

  const handleProtectedAction = (action) => {
    if (!isLoggedIn) {
      navigate(`/login?returnTo=/${action}`);
      return;
    }
    navigate(`/${action}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
<<<<<<< Updated upstream
        {/* Main header */}
        <div className="navbar-header">
          <Link to="/" className="navbar-title">
            BuildCrew Skill Swap Platform
          </Link>
          
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-info">
                <span>Welcome, {user?.name || 'User'}!</span>
                {user?.role === 'admin' && <span className="admin-badge">Admin</span>}
                <button onClick={onLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </div>
            )}
          </div>
=======
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Skill Swap</span>
        </Link>

        <div className="navbar-right">
          {isLoggedIn && (
            <Link to="/profile" className="profile-link">
              <div className="profile-icon">
                <img 
                  src="https://i.pravatar.cc/150?img=3" 
                  alt="Profile" 
                  className="profile-image"
                />
              </div>
            </Link>
          )}
          <button 
            className="auth-button"
            onClick={handleAuthAction}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
>>>>>>> Stashed changes
        </div>

        {/* Navigation buttons - Hidden as requested */}
        {/* <div className="navbar-nav">
          <button 
            onClick={() => handleProtectedAction('profile')} 
            className="nav-btn"
          >
            My Profile
          </button>
          <button 
            onClick={() => handleProtectedAction('dashboard')} 
            className="nav-btn"
          >
            Dashboard
          </button>
          <button 
            onClick={() => handleProtectedAction('skills')} 
            className="nav-btn"
          >
            Browse Skills
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar; 