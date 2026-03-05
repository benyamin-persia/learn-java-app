/**
 * Learn Java — Main app and routing.
 * Routes: Dashboard, Week view, Topic (lesson + activities + quiz), Projects list, Project detail,
 * Login, Register. Auth state in header: Sign in / Register when anonymous; email + Log out when logged in.
 * Header: logo + nav (Text size, Dashboard, Projects, user). On mobile, nav items move into a dropdown menu.
 */
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
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

/** Renders Text size + Dashboard + Projects + user/auth — used in both desktop nav and mobile dropdown */
function NavItems({ onNavigate }) {
  const { user, isAuthenticated, logout, authChecked } = useAuth();
  const { fontSize, setFontSize, options } = useFontSize();
  return (
    <>
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
      <NavLink to="/" end onClick={onNavigate}>Dashboard</NavLink>
      <NavLink to="/projects" onClick={onNavigate}>Projects</NavLink>
      {authChecked && (
        isAuthenticated ? (
          <span className="app-user">
            <span className="app-user-email" title={user?.email}>{user?.displayName || user?.email}</span>
            <button type="button" className="app-logout" onClick={() => { onNavigate?.(); logout(); }}>Log out</button>
          </span>
        ) : (
          <>
            <NavLink to="/login" onClick={onNavigate}>Sign in</NavLink>
            <NavLink to="/register" onClick={onNavigate}>Register</NavLink>
          </>
        )
      )}
    </>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile dropdown when route changes (user clicked a link)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" className="app-logo">
          Learn Java
        </NavLink>
        <nav className="app-nav" aria-label="Main">
          {/* Mobile: single menu button toggles dropdown */}
          <button
            type="button"
            className="app-menu-btn"
            aria-expanded={mobileMenuOpen}
            aria-controls="app-nav-dropdown"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            <span className="app-menu-btn-icon" aria-hidden>☰</span>
            <span className="app-menu-btn-text">Menu</span>
          </button>
          {/* Desktop: inline items */}
          <div className="app-nav-inner">
            <NavItems />
          </div>
          {/* Mobile: dropdown with same items (Text size, Dashboard, Projects, user) */}
          {mobileMenuOpen && (
            <div
              id="app-nav-dropdown"
              className="app-nav-dropdown"
              role="menu"
              aria-label="Navigation menu"
            >
              <div className="app-nav-dropdown-backdrop" onClick={() => setMobileMenuOpen(false)} aria-hidden />
              <div className="app-nav-dropdown-panel">
                <NavItems onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </div>
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
