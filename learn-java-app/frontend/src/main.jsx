/**
 * Learn Java — Entry point.
 * Wraps the app with Router and ProgressProvider so curriculum and progress are available everywhere.
 *
 * React Router future flags (v7_startTransition, v7_relativeSplatPath):
 * Opt-in to v7 behavior early to avoid console warnings and prepare for React Router v7.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import './index.css';

// Future flags silence React Router v7 migration warnings and enable new behavior early
const routerFutureFlags = {
  v7_startTransition: true,      // wrap state updates in React.startTransition (v7 default)
  v7_relativeSplatPath: true,    // new relative route resolution for splat routes (v7 default)
};

// AuthProvider wraps ProgressProvider so progress API requests can use the stored JWT (per-user progress)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={routerFutureFlags}>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
