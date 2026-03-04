/**
 * Progress API - get/update user progress per userId.
 * When user is logged in (JWT), req.userId is set by optionalAuth; progress is stored per user.
 * When anonymous, req.userId is null and we use 'default' so progress works without login.
 */
import express from 'express';
import { UserProgress } from '../models/UserProgress.js';

const router = express.Router();
const DEFAULT_USER_ID = 'default';

/** Resolve effective userId: logged-in user's ID or anonymous default */
function getEffectiveUserId(req) {
  return req.userId && String(req.userId).trim() ? String(req.userId) : DEFAULT_USER_ID;
}

// Get or create progress for user (by userId from JWT or default for anonymous)
async function getOrCreateProgress(userId) {
  let progress = await UserProgress.findOne({ userId });
  if (!progress) {
    progress = await UserProgress.create({ userId, weeks: [], projects: [] });
    console.log('[progress] Created new progress for userId:', userId === DEFAULT_USER_ID ? 'anonymous' : userId);
  }
  return progress;
}

router.get('/', async (req, res) => {
  try {
    const userId = getEffectiveUserId(req);
    const progress = await getOrCreateProgress(userId);
    res.json(progress);
  } catch (err) {
    console.error('GET /api/progress error:', err.message);
    console.error(err.stack);
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(500).json({
      error: 'Failed to fetch progress',
      ...(isDev && { detail: err.message, code: err.code }),
    });
  }
});

router.post('/topic', async (req, res) => {
  try {
    const { weekSlug, topicSlug, lessonCompleted, activitiesCompleted, quizCompleted, quizScore } = req.body;
    if (!weekSlug || !topicSlug) {
      return res.status(400).json({ error: 'weekSlug and topicSlug required' });
    }
    const userId = getEffectiveUserId(req);
    const progress = await getOrCreateProgress(userId);
    let weekProgress = progress.weeks.find((w) => w.weekSlug === weekSlug);
    if (!weekProgress) {
      weekProgress = { weekSlug, topics: [], weekQuizCompleted: false };
      progress.weeks.push(weekProgress);
    }
    let topicProgress = weekProgress.topics.find((t) => t.topicSlug === topicSlug);
    if (!topicProgress) {
      topicProgress = { topicSlug, lessonCompleted: false, activitiesCompleted: false, quizCompleted: false, quizAttempts: 0 };
      weekProgress.topics.push(topicProgress);
    }
    if (lessonCompleted !== undefined) topicProgress.lessonCompleted = lessonCompleted;
    if (activitiesCompleted !== undefined) topicProgress.activitiesCompleted = activitiesCompleted;
    if (quizCompleted !== undefined) {
      topicProgress.quizCompleted = quizCompleted;
      topicProgress.quizAttempts = (topicProgress.quizAttempts || 0) + 1;
    }
    if (quizScore !== undefined) topicProgress.quizScore = quizScore;
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error('POST /progress/topic error:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

router.post('/project', async (req, res) => {
  try {
    const { projectSlug, started, completed, completedSteps } = req.body;
    if (!projectSlug) return res.status(400).json({ error: 'projectSlug required' });
    const userId = getEffectiveUserId(req);
    const progress = await getOrCreateProgress(userId);
    let projectProgress = progress.projects.find((p) => p.projectSlug === projectSlug);
    if (!projectProgress) {
      projectProgress = { projectSlug, started: false, completed: false, completedSteps: [] };
      progress.projects.push(projectProgress);
    }
    if (started !== undefined) projectProgress.started = started;
    if (completed !== undefined) projectProgress.completed = completed;
    if (completedSteps !== undefined) projectProgress.completedSteps = completedSteps;
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error('POST /progress/project error:', err);
    res.status(500).json({ error: 'Failed to update project progress' });
  }
});

export default router;
