/**
 * Learn Java — Main app and routing.
 * Routes: Dashboard, Week view, Topic (lesson + activities + quiz), Projects list, Project detail,
 * Login, Register. Auth state in header: Sign in / Register when anonymous; email + Log out when logged in.
 * Header also includes user-adjustable font size (persists in localStorage; useful on mobile).
 */
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WeekView from './pages/WeekView';
import TopicView from './pages/TopicView';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import { useFontSize } from './context/FontSizeContext';
import './App.css';

function App() {
  const { user, isAuthenticated, logout, authChecked } = useAuth();
  const { fontSize, setFontSize, options } = useFontSize();

  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" className="app-logo">
          Learn Java
        </NavLink>
        <nav className="app-nav">
          {/* User-adjustable text size: visible in header; persists in localStorage; redeploy to see on live */}
          <div className="app-font-size" role="group" aria-label="Text size">
            <span className="app-font-size-label">Text size</span>
            <div className="app-font-size-buttons">
              {options.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={`app-font-size-btn ${fontSize === opt.key ? 'active' : ''}`}
                  onClick={() => setFontSize(opt.key)}
                  aria-label={opt.ariaLabel}
                  aria-pressed={fontSize === opt.key}
                >
                  {opt.key === 'xlarge' ? 'XL' : opt.label.charAt(0)}
                </button>
              ))}
            </div>
          </div>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          {authChecked && (
            isAuthenticated ? (
              <span className="app-user">
                <span className="app-user-email" title={user?.email}>{user?.displayName || user?.email}</span>
                <button type="button" className="app-logout" onClick={logout}>Log out</button>
              </span>
            ) : (
              <>
                <NavLink to="/login">Sign in</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )
          )}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/week/:weekSlug" element={<WeekView />} />
          <Route path="/week/:weekSlug/topic/:topicSlug" element={<TopicView />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
