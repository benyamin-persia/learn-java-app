/**
 * ProjectDetail — Shows one project: description, concepts, and step-by-step guide.
 * User can mark steps complete and mark project complete.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { curriculumApi } from '../api/client';
import { useProgress } from '../context/ProgressContext';
import './projects.css';

export default function ProjectDetail() {
  const { projectSlug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProjectProgress, markProjectStarted, markProjectStep, markProjectCompleted } = useProgress();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await curriculumApi.getProject(projectSlug);
        if (!cancelled) {
          setProject(data);
          markProjectStarted(projectSlug);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [projectSlug]);

  const progress = getProjectProgress(projectSlug);
  const completedSteps = progress.completedSteps || [];

  const handleToggleStep = (stepOrder) => {
    const next = completedSteps.includes(stepOrder)
      ? completedSteps.filter((s) => s !== stepOrder)
      : [...completedSteps, stepOrder].sort((a, b) => a - b);
    markProjectStep(projectSlug, next);
  };

  const handleMarkComplete = () => {
    markProjectCompleted(projectSlug);
  };

  if (loading) return <div className="page-loading">Loading project…</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!project) return null;

  const steps = (project.steps || []).sort((a, b) => a.order - b.order);
  const allStepsDone = steps.length > 0 && steps.every((s) => completedSteps.includes(s.order));

  return (
    <div className="project-detail">
      <Link to="/projects" className="back-link">← Projects</Link>
      <h1>{project.title}</h1>
      <p className="project-desc">{project.description}</p>
      {project.concepts?.length > 0 && (
        <div className="project-concepts-block">
          <strong>Concepts used:</strong>
          <ul>
            {project.concepts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <section className="project-steps">
        <h2>Steps</h2>
        {steps.map((step) => (
          <div key={step.order} className={`project-step ${completedSteps.includes(step.order) ? 'completed' : ''}`}>
            <label className="step-checkbox">
              <input
                type="checkbox"
                checked={completedSteps.includes(step.order)}
                onChange={() => handleToggleStep(step.order)}
              />
              <span className="step-title">Step {step.order}: {step.title}</span>
            </label>
            <p className="step-desc">{step.description}</p>
            {step.concepts?.length > 0 && (
              <p className="step-concepts"><strong>Concepts:</strong> {step.concepts.join(', ')}</p>
            )}
            {step.hints?.length > 0 && (
              <details className="step-hints">
                <summary>Hints</summary>
                <ul>
                  {step.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </section>

      {allStepsDone && !progress.completed && (
        <button type="button" className="btn-primary" onClick={handleMarkComplete}>
          Mark project complete
        </button>
      )}
      {progress.completed && (
        <p className="project-done">✓ You've completed this project!</p>
      )}
    </div>
  );
}
