import React, { useState } from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
>>>>>>> 158d785 (commit from backend of login logic implimentation)
import './Login.css';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [error, setError] = useState('');
=======
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
>>>>>>> 158d785 (commit from backend of login logic implimentation)

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    // TODO: Implement actual login logic
    if (email && password) {
      onLoginSuccess();
      navigate('/');
    } else {
      setError('Please enter both email and password');
    }
=======
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        setSuccess(response.message);
        
        // Store user data and redirect
        console.log('Login successful:', response.user);
        
        // Redirect to home after successful login
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setEmail('admin@admin.com');
    setPassword('admin');
>>>>>>> 158d785 (commit from backend of login logic implimentation)
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please sign in to continue</p>
        
        {error && (
<<<<<<< HEAD
          <div className="error-message">
=======
          <div className="alert alert-error">
>>>>>>> 158d785 (commit from backend of login logic implimentation)
            {error}
          </div>
        )}
        
<<<<<<< HEAD
=======
        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}
        
>>>>>>> 158d785 (commit from backend of login logic implimentation)
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="admin-login-section">
          <button 
            type="button"
            className="btn btn-secondary admin-btn"
            onClick={handleAdminLogin}
            disabled={loading}
          >
            Use Admin Login
          </button>
          <p className="admin-info">
            Click above to auto-fill admin credentials (admin@admin.com / admin)
          </p>
        </div>
        
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login; 