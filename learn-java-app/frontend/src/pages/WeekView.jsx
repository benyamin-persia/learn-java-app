/**
 * WeekView — Shows one week's topics. User can open any topic (lesson → activities → quiz).
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curriculumApi } from '../api/client';
import { useProgress } from '../context/ProgressContext';
import './dashboard.css';

export default function WeekView() {
  const { weekSlug } = useParams();
  const [week, setWeek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isTopicLessonDone, isTopicActivitiesDone, isTopicQuizDone } = useProgress();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await curriculumApi.getWeek(weekSlug);
        if (!cancelled) setWeek(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [weekSlug]);

  if (loading) return <div className="page-loading">Loading week…</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!week) return null;

  const topics = (week.topics || []).sort((a, b) => a.order - b.order);

  return (
    <div className="week-view">
      <Link to="/" className="back-link">← Dashboard</Link>
      <h1>{week.title}</h1>
      {week.description && <p className="week-desc">{week.description}</p>}
      <ul className="topic-list">
        {topics.map((topic) => {
          const lessonDone = isTopicLessonDone(week.slug, topic.slug);
          const activitiesDone = isTopicActivitiesDone(week.slug, topic.slug);
          const quizDone = isTopicQuizDone(week.slug, topic.slug);
          return (
            <li key={topic.slug}>
              <Link to={`/week/${week.slug}/topic/${topic.slug}`} className="topic-link">
                <span className="topic-order">{topic.order}</span>
                <span className="topic-title">{topic.title}</span>
                <span className="topic-status">
                  {lessonDone && <span className="done" title="Lesson done">L</span>}
                  {activitiesDone && <span className="done" title="Activities done">A</span>}
                  {quizDone && <span className="done" title="Quiz done">Q</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
