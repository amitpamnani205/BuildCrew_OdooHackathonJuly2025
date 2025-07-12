import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import apiService from '../services/api';
import './Login.css';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        setSuccess(response.message);
        
        // Store user data and call success callback
        console.log('Login successful:', response.user);
        
        // Call the parent component's login success handler
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        // Get return URL from search params, default to home
        const returnTo = searchParams.get('returnTo') || '/';
        
        // Redirect after successful login
        setTimeout(() => {
          navigate(returnTo);
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
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please sign in to continue</p>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

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
        
        <div className="back-to-home">
          <button 
            type="button"
            className="btn btn-text"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login; 