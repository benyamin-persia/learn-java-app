/**
 * ProjectList — Lists all real-world projects. Expandable: new projects from API appear here.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { curriculumApi } from '../api/client';
import { useProgress } from '../context/ProgressContext';
import './projects.css';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProjectProgress } = useProgress();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await curriculumApi.getProjects();
        if (!cancelled) setProjects(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="page-loading">Loading projects…</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="project-list-page">
      <h1>Real-world projects</h1>
      <p className="page-intro">
        Apply what you learned with these four projects. Each includes steps and concepts from the curriculum.
      </p>
      <ul className="project-cards">
        {projects.map((proj) => {
          const prog = getProjectProgress(proj.slug);
          return (
            <li key={proj.slug}>
              <Link to={`/projects/${proj.slug}`} className="project-card">
                <span className="project-number">Project {proj.order}</span>
                <h2>{proj.title}</h2>
                <p>{proj.description}</p>
                {proj.concepts?.length > 0 && (
                  <ul className="project-concepts">
                    {proj.concepts.slice(0, 3).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
                {prog.completed && <span className="badge done">Done</span>}
                {prog.started && !prog.completed && <span className="badge in-progress">In progress</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
