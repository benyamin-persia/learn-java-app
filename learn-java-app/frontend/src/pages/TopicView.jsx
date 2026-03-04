/**
 * TopicView — Full flow: Lesson (read) → Activities (play) → Quiz (test).
 * Fun, readable layout with hero, progress steps, and motivational copy.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curriculumApi } from '../api/client';
import { useProgress } from '../context/ProgressContext';
import LessonContent from '../components/LessonContent';
import ActivityList from '../components/ActivityList';
import Quiz from '../components/Quiz';
import './TopicView.css';
import '../components/activity.css';
import '../components/quiz.css';

// Short motivational taglines for the hero (one shown per topic)
const TAGLINES = [
  "You've got this — one step at a time.",
  "Understanding this will make everything else click.",
  "This is where it gets good.",
  "Let's break it down so it sticks.",
  "Read, practice, then own it.",
];
function getTagline(topicSlug) {
  const hash = topicSlug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return TAGLINES[hash % TAGLINES.length];
}

export default function TopicView() {
  const { weekSlug, topicSlug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('lesson'); // 'lesson' | 'activities' | 'quiz'
  const {
    markLessonCompleted,
    markActivitiesCompleted,
    markQuizCompleted,
    isTopicLessonDone,
    isTopicActivitiesDone,
    isTopicQuizDone,
  } = useProgress();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await curriculumApi.getTopic(weekSlug, topicSlug);
        if (!cancelled) setData(res);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [weekSlug, topicSlug]);

  const handleLessonComplete = () => {
    markLessonCompleted(weekSlug, topicSlug);
    setSection('activities');
  };

  const handleActivitiesComplete = () => {
    markActivitiesCompleted(weekSlug, topicSlug);
    setSection('quiz');
  };

  const handleQuizComplete = (score) => {
    markQuizCompleted(weekSlug, topicSlug, score);
  };

  if (loading) return <div className="page-loading">Loading topic…</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!data) return null;

  const { week, topic } = data;
  const hasActivities = topic.activities && topic.activities.length > 0;
  const hasQuiz = topic.quizQuestions && topic.quizQuestions.length > 0;

  const lessonDone = isTopicLessonDone(weekSlug, topicSlug);
  const activitiesDone = isTopicActivitiesDone(weekSlug, topicSlug);
  const quizDone = isTopicQuizDone(weekSlug, topicSlug);

  return (
    <div className="topic-view">
      <Link to={`/week/${weekSlug}`} className="back-link">← Back to {week.title}</Link>

      <header className="topic-view-hero">
        <h1>{topic.title}</h1>
        <p className="topic-view-hero-tagline">{getTagline(topicSlug)}</p>
      </header>

      <nav className="topic-steps" aria-label="Topic steps">
        <button
          type="button"
          className={`topic-step ${section === 'lesson' ? 'active' : ''} ${lessonDone ? 'done' : ''}`}
          onClick={() => setSection('lesson')}
        >
          <span className="topic-step-num">1</span>
          <span className="topic-step-label">Read</span>
          {lessonDone && ' ✓'}
        </button>
        <button
          type="button"
          className={`topic-step ${section === 'activities' ? 'active' : ''} ${activitiesDone ? 'done' : ''}`}
          onClick={() => setSection('activities')}
          disabled={!lessonDone}
        >
          <span className="topic-step-num">2</span>
          <span className="topic-step-label">Practice</span>
          {activitiesDone && ' ✓'}
        </button>
        <button
          type="button"
          className={`topic-step ${section === 'quiz' ? 'active' : ''} ${quizDone ? 'done' : ''}`}
          onClick={() => setSection('quiz')}
          disabled={hasActivities && !activitiesDone}
        >
          <span className="topic-step-num">3</span>
          <span className="topic-step-label">Quiz</span>
          {quizDone && ' ✓'}
        </button>
      </nav>

      {section === 'lesson' && (
        <section className="topic-section">
          <LessonContent content={topic.lessonContent} />
          <div className="topic-cta">
            <p className="topic-cta-text">When you're ready, move on to the practice activities.</p>
            <button type="button" className="btn-primary" onClick={handleLessonComplete}>
              I've read this — continue to Practice →
            </button>
          </div>
        </section>
      )}

      {section === 'activities' && (
        <section className="topic-section">
          {hasActivities ? (
            <>
              <p className="topic-cta-text">Complete the activities below to lock in what you just read.</p>
              <ActivityList
                activities={topic.activities}
                onComplete={handleActivitiesComplete}
              />
            </>
          ) : (
            <>
              <p className="topic-cta-text">No activities for this topic — head straight to the quiz when you're ready.</p>
              <button type="button" className="btn-primary" onClick={handleActivitiesComplete}>
                Continue to Quiz →
              </button>
            </>
          )}
        </section>
      )}

      {section === 'quiz' && (
        <section className="topic-section">
          {hasQuiz ? (
            <>
              <p className="topic-cta-text">See how much you've got. Don't stress — you can always review and try again.</p>
              <Quiz
                questions={topic.quizQuestions}
                onComplete={handleQuizComplete}
              />
            </>
          ) : (
            <p className="topic-cta-text">No quiz here. You're done with this topic — nice work!</p>
          )}
        </section>
      )}
    </div>
  );
}
