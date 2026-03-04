/**
 * Learn Java — Main app and routing.
 * Routes: Dashboard, Week view, Topic (lesson + activities + quiz), Projects list, Project detail,
 * Login, Register. Auth state in header: Sign in / Register when anonymous; email + Log out when logged in.
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
import './App.css';

function App() {
  const { user, isAuthenticated, logout, authChecked } = useAuth();

  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" className="app-logo">
          Learn Java
        </NavLink>
        <nav className="app-nav">
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
