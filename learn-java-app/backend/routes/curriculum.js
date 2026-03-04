/**
 * Curriculum API - weeks and topics.
 * GET /api/curriculum/weeks - list all weeks (for expandable curriculum)
 * GET /api/curriculum/weeks/:slug - single week with topics
 * GET /api/curriculum/weeks/:weekSlug/topics/:topicSlug - single topic (lesson + activities + quiz)
 * GET /api/curriculum/projects - list all projects
 * GET /api/curriculum/projects/:slug - single project with steps
 */
import express from 'express';
import { Week } from '../models/Week.js';
import { Project } from '../models/Project.js';

const router = express.Router();

router.get('/weeks', async (req, res) => {
  try {
    const weeks = await Week.find().sort({ order: 1 }).select('order slug title description topics.order topics.slug topics.title');
    res.json(weeks);
  } catch (err) {
    // Log full stack in all envs for debugging; include message in dev response
    console.error('GET /api/curriculum/weeks error:', err.message);
    console.error(err.stack);
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(500).json({
      error: 'Failed to fetch weeks',
      ...(isDev && { detail: err.message, code: err.code }),
    });
  }
});

router.get('/weeks/:slug', async (req, res) => {
  try {
    const week = await Week.findOne({ slug: req.params.slug });
    if (!week) return res.status(404).json({ error: 'Week not found' });
    res.json(week);
  } catch (err) {
    console.error('GET /weeks/:slug error:', err);
    res.status(500).json({ error: 'Failed to fetch week' });
  }
});

router.get('/weeks/:weekSlug/topics/:topicSlug', async (req, res) => {
  try {
    const week = await Week.findOne({ slug: req.params.weekSlug });
    if (!week) return res.status(404).json({ error: 'Week not found' });
    const topic = week.topics.find((t) => t.slug === req.params.topicSlug);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.json({ week: { slug: week.slug, title: week.title }, topic });
  } catch (err) {
    console.error('GET topic error:', err);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 }).select('order slug title description weekId concepts');
    res.json(projects);
  } catch (err) {
    console.error('GET /projects error:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/projects/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('GET /projects/:slug error:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

export default router;
