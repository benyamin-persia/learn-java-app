/**
 * Authentication middleware for protecting routes and identifying the current user.
 * Reads JWT from Authorization: Bearer <token> or from cookie (optional).
 * Progress API uses req.userId: when present, progress is saved per user; when absent, uses 'default' (anonymous).
 */
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

/**
 * Optional auth: if a valid JWT is sent, sets req.user and req.userId.
 * Does not block request if no token or invalid token (so anonymous progress still works).
 */
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    req.userId = null;
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded typically has { userId: string, email?: string, iat, exp }
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (err) {
    // Invalid or expired token: treat as anonymous
    console.log('[auth] Invalid or expired token:', err.message);
    req.userId = null;
    req.user = null;
    next();
  }
}

/**
 * Require auth: returns 401 if no valid JWT. Use for routes that must be logged in.
 */
export function requireAuth(req, res, next) {
  optionalAuth(req, res, () => {
    if (req.userId) return next();
    res.status(401).json({ error: 'Authentication required', code: 'UNAUTHORIZED' });
  });
}

/**
 * Issue a JWT for a user after successful login. Token includes userId and email for UI.
 */
export function signToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), email: user.email },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}
