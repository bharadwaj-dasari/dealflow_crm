const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate email format
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Returns array of error messages (empty if valid)
 */
const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return errors;
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must not exceed 128 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter (a-z)');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter (A-Z)');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number (0-9)');
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character (@#$%*!&)');
  }
  
  return errors;
};

/**
 * Validate name
 */
const validateName = (name) => {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
    return errors;
  }
  
  if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (name.length > 50) {
    errors.push('Name must not exceed 50 characters');
  }
  
  return errors;
};

/**
 * Sanitize input to prevent XSS
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, ''); // Remove < and > to prevent script injection
};

// ============================================
// TOKEN GENERATION
// ============================================

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// ============================================
// AUTHENTICATION ROUTES
// ============================================

/**
 * SIGNUP - Register new user
 * POST /api/auth/signup
 */
router.post('/signup', async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);

    // Validate all fields present
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Please provide all required fields (name, email, password)' 
      });
    }

    // Validate name
    const nameErrors = validateName(name);
    if (nameErrors.length > 0) {
      return res.status(400).json({ error: nameErrors[0] });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate password strength
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Password does not meet requirements',
        details: passwordErrors 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'An account with this email already exists. Please login instead.' 
      });
    }

    // Create new user
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase(), 
      password 
    });

    // Return user data with token
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages[0] });
    }
    
    return res.status(500).json({ error: 'Server error during signup. Please try again.' });
  }
});

/**
 * LOGIN - Authenticate user
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    // Sanitize inputs
    email = sanitizeInput(email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Find user (case-insensitive email)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user data with token
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login. Please try again.' });
  }
});

/**
 * GET CURRENT USER
 * GET /api/auth/me
 */
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided. Authorization denied.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token. Authorization denied.' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    
    return res.status(401).json({ error: 'Authorization failed' });
  }
});

/**
 * UPDATE PROFILE
 * PATCH /api/auth/update-profile
 */
router.patch('/update-profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let { name, email } = req.body;

    // Sanitize inputs
    if (name) name = sanitizeInput(name);
    if (email) email = sanitizeInput(email);

    // Validate name if provided
    if (name) {
      const nameErrors = validateName(name);
      if (nameErrors.length > 0) {
        return res.status(400).json({ error: nameErrors[0] });
      }
    }

    // Validate email if provided
    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
      }

      // Check if email is taken by another user
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(), 
        _id: { $ne: decoded.id } 
      });
      if (existingUser) {
        return res.status(400).json({ error: 'This email is already in use by another account' });
      }
    }

    // Update user
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase();

    const user = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    return res.status(500).json({ error: 'Failed to update profile. Please try again.' });
  }
});

/**
 * CHANGE PASSWORD
 * PATCH /api/auth/change-password
 */
router.patch('/change-password', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { currentPassword, newPassword } = req.body;

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Please provide both current password and new password' 
      });
    }

    // Validate new password strength
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ 
        error: 'New password does not meet requirements',
        details: passwordErrors 
      });
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return res.status(400).json({ 
        error: 'New password must be different from current password' 
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.json({ 
      message: 'Password changed successfully. Please login with your new password.' 
    });
  } catch (error) {
    console.error('Change password error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    return res.status(500).json({ error: 'Failed to change password. Please try again.' });
  }
});

/**
 * GOOGLE LOGIN
 * POST /api/auth/google-login
 */
router.post('/google-login', async (req, res) => {
  try {
    let { email, name, googleId } = req.body;

    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);

    // Validate inputs
    if (!email || !name || !googleId) {
      return res.status(400).json({ error: 'Missing required Google authentication data' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email from Google authentication' });
    }

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists - update googleId if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Create new user for Google login
      user = await User.create({
        name: name.trim(),
        email: email.toLowerCase(),
        password: googleId + process.env.JWT_SECRET, // Secure placeholder
        googleId,
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({ error: 'Google authentication failed. Please try again.' });
  }
});

/**
 * DELETE ACCOUNT
 * DELETE /api/auth/delete-account
 */
router.delete('/delete-account', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const { password } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // For Google users without password
    if (user.googleId && !password) {
      // Allow deletion without password for Google-only users
      console.log('Deleting Google-authenticated user account');
    } else {
      // Require password for email/password users
      if (!password) {
        return res.status(400).json({ 
          error: 'Password is required to delete your account' 
        });
      }

      // Verify password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ 
          error: 'Incorrect password. Account deletion cancelled for security.' 
        });
      }
    }

    // Delete all user's leads first
    const Lead = require('../models/Lead');
    const deletedLeads = await Lead.deleteMany({ userId });
    console.log(`Deleted ${deletedLeads.deletedCount} leads for user ${userId}`);

    // Delete user account
    await User.findByIdAndDelete(userId);

    return res.json({ 
      message: 'Account and all associated data deleted successfully' 
    });
  } catch (error) {
    console.error('Delete account error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    return res.status(500).json({ error: 'Failed to delete account. Please try again.' });
  }
});

// ============================================
// EXPORTS
// ============================================

module.exports = router;
