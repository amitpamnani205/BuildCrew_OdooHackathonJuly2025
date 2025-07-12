const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const authController = {
  // Register a new user
  register: async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      // Create new user
      const user = new User({
        name,
        email,
        password
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Return success response
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: user.getPublicProfile()
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during registration'
      });
    }
  },

  // Login user (includes admin login)
  login: async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // Check for admin login (hardcoded credentials)
      if (email === 'admin@admin.com' && password === 'admin') {
        const adminToken = generateToken('admin');
        
        return res.json({
          success: true,
          message: 'Admin login successful',
          token: adminToken,
          user: {
            _id: 'admin',
            name: 'Administrator',
            email: 'admin@admin.com',
            role: 'admin',
            isActive: true,
            joinedAt: new Date(),
            lastActive: new Date()
          }
        });
      }

      // Find user and include password for comparison
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Update last active
      user.lastActive = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Return success response
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: user.getPublicProfile()
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  },

  // Get current user profile
  getProfile: async (req, res) => {
    try {
      res.json({
        success: true,
        user: req.user.getPublicProfile()
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error getting profile'
      });
    }
  },

  // Logout user
  logout: async (req, res) => {
    try {
      // Update last active time
      if (req.user && req.user._id !== 'admin') {
        req.user.lastActive = new Date();
        await req.user.save();
      }

      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during logout'
      });
    }
  }
};

module.exports = authController; 