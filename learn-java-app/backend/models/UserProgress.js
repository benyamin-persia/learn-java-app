/**
 * UserProgress - Tracks completion per user (anonymous or future auth).
 * Expandable: add userId when you add authentication.
 */
import mongoose from 'mongoose';

const topicProgressSchema = new mongoose.Schema({
  topicSlug: { type: String, required: true },
  lessonCompleted: { type: Boolean, default: false },
  activitiesCompleted: { type: Boolean, default: false },
  quizCompleted: { type: Boolean, default: false },
  quizScore: { type: Number },
  quizAttempts: { type: Number, default: 0 },
}, { _id: false });

const weekProgressSchema = new mongoose.Schema({
  weekSlug: { type: String, required: true },
  topics: [topicProgressSchema],
  weekQuizCompleted: { type: Boolean, default: false },
  weekQuizScore: { type: Number },
}, { _id: false });

const projectProgressSchema = new mongoose.Schema({
  projectSlug: { type: String, required: true },
  started: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  completedSteps: [Number],
}, { _id: false });

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, default: 'default' }, // for future auth
  weeks: [weekProgressSchema],
  projects: [projectProgressSchema],
}, { timestamps: true });

export const UserProgress = mongoose.model('UserProgress', userProgressSchema);
