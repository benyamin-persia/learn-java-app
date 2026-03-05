/**
 * Dashboard — Lists all weeks from the curriculum API.
 * Expandable: new weeks added in the backend appear here automatically.
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { curriculumApi } from '../api/client';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import './dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { progress, isTopicLessonDone, isTopicQuizDone } = useProgress();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await curriculumApi.getWeeks();
        if (!cancelled) setWeeks(data);
      } catch (err) {
        if (!cancelled) {
          const status = err.status;
          const friendly =
            status === 503
              ? 'Backend database not connected. Start MongoDB, then start the backend (see backend README).'
              : status >= 500
                ? 'Server error. Check that the backend is running and MongoDB is started; run npm run seed in the backend folder if needed.'
                : err.message;
          setError(friendly);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const completedCount = (week) => {
    if (!progress?.weeks) return 0;
    const w = progress.weeks.find((x) => x.weekSlug === week.slug);
    if (!w?.topics) return 0;
    return w.topics.filter((t) => t.lessonCompleted && t.quizCompleted).length;
  };

  /**
   * Find where the user left off: first topic that isn't fully complete (lesson + activities + quiz),
   * or first project that is started but not completed. Used for "Continue where you left off".
   */
  const getResumeTarget = () => {
    if (!weeks?.length) return null;
    for (const week of weeks) {
      const weekProg = progress?.weeks?.find((w) => w.weekSlug === week.slug);
      const topics = (week.topics || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      for (const topic of topics) {
        const t = weekProg?.topics?.find((x) => x.topicSlug === topic.slug);
        const done = t?.lessonCompleted && t?.activitiesCompleted && t?.quizCompleted;
        if (!done) {
          return { type: 'topic', weekSlug: week.slug, weekTitle: week.title, topicSlug: topic.slug, topicTitle: topic.title };
        }
      }
    }
    const projects = progress?.projects || [];
    const inProgressProject = projects.find((p) => p.started && !p.completed);
    if (inProgressProject) {
      return { type: 'project', projectSlug: inProgressProject.projectSlug };
    }
    return null;
  };

  const resume = getResumeTarget();
  const resumePath = resume
    ? resume.type === 'topic'
      ? `/week/${resume.weekSlug}/topic/${resume.topicSlug}`
      : `/projects/${resume.projectSlug}`
    : null;

  // Auto-redirect to where the user left off (or first topic for new users) so they land right in the flow
  useEffect(() => {
    if (loading || error || !weeks.length || !resumePath) return;
    navigate(resumePath, { replace: true });
  }, [loading, error, weeks.length, resumePath, navigate]);

  if (loading) return <div className="page-loading">Loading curriculum…</div>;
  if (error) {
    return (
      <div className="page-error">
        <p><strong>Could not load curriculum</strong></p>
        <p>{error}</p>
        <p className="page-error-hint">Start the <strong>MongoDB server</strong> (not just the shell): on Windows open Command Prompt as Administrator and run <code>net start MongoDB</code>. Then in <code>learn-java-app/backend</code> run <code>npm run seed</code>. The backend will reconnect automatically; refresh this page after MongoDB is running.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Curriculum</h1>
      <p className="dashboard-intro">
        Learn step by step: read the lesson → do the activities → take the quiz. Then build real projects.
      </p>
      {resume && (
        <section className="dashboard-resume">
          <h2 className="dashboard-resume-title">Continue where you left off</h2>
          {resume.type === 'topic' ? (
            <Link to={`/week/${resume.weekSlug}/topic/${resume.topicSlug}`} className="dashboard-resume-link">
              <span className="dashboard-resume-label">{resume.weekTitle}</span>
              <span className="dashboard-resume-item">{resume.topicTitle}</span>
            </Link>
          ) : (
            <Link to={`/projects/${resume.projectSlug}`} className="dashboard-resume-link">
              <span className="dashboard-resume-label">Project</span>
              <span className="dashboard-resume-item">Continue your project</span>
            </Link>
          )}
        </section>
      )}
      {!isAuthenticated && (
        <p className="dashboard-auth-hint">
          <Link to="/login">Sign in</Link> or <Link to="/register">create an account</Link> to save your progress across devices.
        </p>
      )}
      <section className="week-list">
        {weeks.map((week) => {
          const total = week.topics?.length ?? 0;
          const done = completedCount(week);
          return (
            <Link
              key={week._id || week.slug}
              to={`/week/${week.slug}`}
              className="week-card"
            >
              <div className="week-card-header">
                <span className="week-badge">Week {week.order}</span>
                <span className="week-progress">{done}/{total} topics</span>
              </div>
              <h2 className="week-title">{week.title}</h2>
              {week.description && (
                <p className="week-desc">{week.description}</p>
              )}
            </Link>
          );
        })}
      </section>
      {weeks.length === 0 && (
        <p className="empty-state">No weeks yet. Run the backend seed: <code>npm run seed</code> in the backend folder.</p>
      )}
    </div>
  );
}
