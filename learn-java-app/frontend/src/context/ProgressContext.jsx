/**
 * ProgressContext — holds user progress (lessons, activities, quizzes, projects).
 * Fetched on load; updated when user completes lesson/activity/quiz/project step.
 * When user logs in/out, we refresh so progress is for the current user (JWT sent by API client).
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { progressApi } from '../api/client';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { token, authChecked } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await progressApi.get();
      setProgress(data);
    } catch (err) {
      const status = err.status;
      const friendly =
        status === 503
          ? 'Database not connected. Start MongoDB and the backend.'
          : status >= 500
            ? 'Backend error. Ensure backend and MongoDB are running.'
            : err.message;
      setError(friendly);
      setProgress({ weeks: [], projects: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and whenever auth changes (login/logout) so we show the right user's progress
  useEffect(() => {
    if (authChecked) refresh();
  }, [authChecked, token, refresh]);

  const markLessonCompleted = useCallback(async (weekSlug, topicSlug) => {
    try {
      await progressApi.updateTopic({ weekSlug, topicSlug, lessonCompleted: true });
      await refresh();
    } catch (err) {
      console.error('Failed to mark lesson completed:', err);
    }
  }, [refresh]);

  const markActivitiesCompleted = useCallback(async (weekSlug, topicSlug) => {
    try {
      await progressApi.updateTopic({ weekSlug, topicSlug, activitiesCompleted: true });
      await refresh();
    } catch (err) {
      console.error('Failed to mark activities completed:', err);
    }
  }, [refresh]);

  const markQuizCompleted = useCallback(async (weekSlug, topicSlug, quizScore) => {
    try {
      await progressApi.updateTopic({ weekSlug, topicSlug, quizCompleted: true, quizScore });
      await refresh();
    } catch (err) {
      console.error('Failed to mark quiz completed:', err);
    }
  }, [refresh]);

  const markProjectStarted = useCallback(async (projectSlug) => {
    try {
      await progressApi.updateProject({ projectSlug, started: true });
      await refresh();
    } catch (err) {
      console.error('Failed to mark project started:', err);
    }
  }, [refresh]);

  const markProjectStep = useCallback(async (projectSlug, completedSteps) => {
    try {
      await progressApi.updateProject({ projectSlug, completedSteps });
      await refresh();
    } catch (err) {
      console.error('Failed to update project steps:', err);
    }
  }, [refresh]);

  const markProjectCompleted = useCallback(async (projectSlug) => {
    try {
      await progressApi.updateProject({ projectSlug, completed: true });
      await refresh();
    } catch (err) {
      console.error('Failed to mark project completed:', err);
    }
  }, [refresh]);

  const isTopicLessonDone = (weekSlug, topicSlug) => {
    const w = progress?.weeks?.find((x) => x.weekSlug === weekSlug);
    const t = w?.topics?.find((x) => x.topicSlug === topicSlug);
    return t?.lessonCompleted ?? false;
  };

  const isTopicActivitiesDone = (weekSlug, topicSlug) => {
    const w = progress?.weeks?.find((x) => x.weekSlug === weekSlug);
    const t = w?.topics?.find((x) => x.topicSlug === topicSlug);
    return t?.activitiesCompleted ?? false;
  };

  const isTopicQuizDone = (weekSlug, topicSlug) => {
    const w = progress?.weeks?.find((x) => x.weekSlug === weekSlug);
    const t = w?.topics?.find((x) => x.topicSlug === topicSlug);
    return t?.quizCompleted ?? false;
  };

  const getTopicQuizScore = (weekSlug, topicSlug) => {
    const w = progress?.weeks?.find((x) => x.weekSlug === weekSlug);
    const t = w?.topics?.find((x) => x.topicSlug === topicSlug);
    return t?.quizScore;
  };

  const getProjectProgress = (projectSlug) => {
    const p = progress?.projects?.find((x) => x.projectSlug === projectSlug);
    return p || { started: false, completed: false, completedSteps: [] };
  };

  const value = {
    progress,
    loading,
    error,
    refresh,
    markLessonCompleted,
    markActivitiesCompleted,
    markQuizCompleted,
    markProjectStarted,
    markProjectStep,
    markProjectCompleted,
    isTopicLessonDone,
    isTopicActivitiesDone,
    isTopicQuizDone,
    getTopicQuizScore,
    getProjectProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
