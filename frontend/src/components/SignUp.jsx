import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './common/Input';
import Button from './common/Button';
import { validateField, validateFile } from '../utils/validation';
import apiService from '../services/api';
import './SignUp.css';

const SignUp = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    const usernameErrors = validateField('username', formData.username, { required: true });
    const emailErrors = validateField('email', formData.email, { required: true });
    const passwordErrors = validateField('password', formData.password, { required: true });
    const confirmErrors = validateField('confirmPassword', formData.confirmPassword, { 
      required: true,
      passwordValue: formData.password
    });

    if (usernameErrors.length) newErrors.username = usernameErrors[0];
    if (emailErrors.length) newErrors.email = emailErrors[0];
    if (passwordErrors.length) newErrors.password = passwordErrors[0];
    if (confirmErrors.length) newErrors.confirmPassword = confirmErrors[0];
    
    // Validate profile photo
    if (profilePhoto) {
      const photoErrors = validateFile(profilePhoto);
      if (photoErrors.length) newErrors.profilePhoto = photoErrors[0];
    } else {
      newErrors.profilePhoto = 'Profile photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Clear error when user selects a file
      if (errors.profilePhoto) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      // Register user with API
      const response = await apiService.register(
        formData.username, // This will be sent as 'name' in the API
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      
      if (response.success) {
        // Registration successful
        console.log('Registration successful:', response.user);
        setSuccess('Account created successfully! Redirecting...');
        
        // Call success callback
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
        
        // Redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to create account. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="website-name">SkillSwap</div>
        <div className="tagline">Share Skills, Grow Together</div>
        <h2>Create Account</h2>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="photo-upload-section">
            <div className="photo-preview-wrapper">
              <div 
                className="photo-preview"
                style={{ 
                  backgroundImage: photoPreview ? `url(${photoPreview})` : 'none'
                }}
                onClick={() => document.getElementById('profilePhoto').click()}
              >
                {!photoPreview && <div className="photo-placeholder" />}
              </div>
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={handlePhotoChange}
                className="photo-input"
              />
            </div>
            {errors.profilePhoto && (
              <div className="error-message photo-error">{errors.profilePhoto}</div>
            )}
          </div>

          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            error={errors.username}
            required
            placeholder="Choose a username"
          />

          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            placeholder="Enter your email"
          />

          <Input
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            placeholder="Create a password"
          />

          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            placeholder="Confirm your password"
          />

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          {success && (
            <div className="success-message">{success}</div>
          )}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>
        
        <p className="login-link">
          Already have an account? <a href="/login">Sign In</a>
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
};

export default SignUp; 