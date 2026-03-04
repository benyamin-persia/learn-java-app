/**
 * Auth API: register and login for application users.
 * Enables each learner to have an account and save progress to MongoDB (per userId).
 */
import express from 'express';
import { User } from '../models/User.js';
import { optionalAuth, requireAuth, signToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Body: { email, password, displayName? }
 * Creates a new user and returns { user: { id, email, displayName }, token }.
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        code: 'VALIDATION_ERROR',
      });
    }
    // Basic validation: email format and password length
    const emailTrimmed = String(email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      return res.status(400).json({
        error: 'Please enter a valid email address',
        code: 'VALIDATION_ERROR',
      });
    }
    if (String(password).length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters',
        code: 'VALIDATION_ERROR',
      });
    }

    const existing = await User.findOne({ email: emailTrimmed });
    if (existing) {
      return res.status(409).json({
        error: 'An account with this email already exists',
        code: 'EMAIL_IN_USE',
      });
    }

    // Pass plain password in passwordHash; User pre-save hook hashes it before storing
    const user = await User.create({
      email: emailTrimmed,
      passwordHash: password, // hook hashes this
      displayName: (displayName && String(displayName).trim()) || '',
    });

    const token = signToken(user);
    console.log('[auth] New user registered:', user.email);

    res.status(201).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName || '',
      },
      token,
    });
  } catch (err) {
    console.error('POST /api/auth/register error:', err.message);
    res.status(500).json({
      error: 'Registration failed',
      code: 'SERVER_ERROR',
      ...(process.env.NODE_ENV !== 'production' && { detail: err.message }),
    });
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns { user: { id, email, displayName }, token }.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        code: 'VALIDATION_ERROR',
      });
    }

    const emailTrimmed = String(email).trim().toLowerCase();
    // We need passwordHash for comparePassword; select it
    const user = await User.findOne({ email: emailTrimmed }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS',
      });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS',
      });
    }

    const token = signToken(user);
    console.log('[auth] User logged in:', user.email);

    res.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName || '',
      },
      token,
    });
  } catch (err) {
    console.error('POST /api/auth/login error:', err.message);
    res.status(500).json({
      error: 'Login failed',
      code: 'SERVER_ERROR',
      ...(process.env.NODE_ENV !== 'production' && { detail: err.message }),
    });
  }
});

/**
 * GET /api/auth/me
 * Optional auth: if valid token provided, returns current user; else 401.
 * Frontend can call this on load to restore session from stored token.
 */
router.get('/me', optionalAuth, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Not authenticated', code: 'UNAUTHORIZED' });
  }
  // We don't have full user in req; fetch minimal profile
  User.findById(req.userId)
    .select('email displayName')
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'User not found', code: 'UNAUTHORIZED' });
      }
      res.json({
        user: {
          id: user._id.toString(),
          email: user.email,
          displayName: user.displayName || '',
        },
      });
    })
    .catch((err) => {
      console.error('GET /api/auth/me error:', err.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    });
});

export default router;
