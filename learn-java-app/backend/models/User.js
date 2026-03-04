/**
 * User model for application-level authentication.
 * Each learning user has an account; progress is stored per userId in UserProgress.
 * MongoDB Atlas stores this in the same cluster (e.g. learn-java database).
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // Unique email for login; required and indexed for fast lookups
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Hashed with bcrypt; never stored in plain text
    passwordHash: { type: String, required: true, select: false },
    // Optional display name (e.g. "Alex"); can be shown in UI
    displayName: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

// unique: true on email already creates an index; no need for a duplicate

/**
 * Hash plain password before saving so we never store plain-text passwords.
 * When creating/updating, set passwordHash to the plain password; this hook hashes it.
 * Only hashes when passwordHash was modified (new user or password change).
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const plain = this.passwordHash;
  if (!plain || plain.length < 6) {
    return next(new Error('Password must be at least 6 characters'));
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(plain, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Compare a plain-text password with the stored hash.
 * Used at login to verify credentials.
 */
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

export const User = mongoose.model('User', userSchema);
