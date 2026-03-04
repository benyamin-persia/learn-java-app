/**
 * AuthContext — holds login state (user + token) for the Learn Java app.
 * When the user is logged in, progress API requests include the JWT so progress is saved per user.
 * Token is stored in localStorage so the session survives page refresh.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/client';

const AuthContext = createContext(null);

const TOKEN_KEY = 'learn-java-token';
const USER_KEY = 'learn-java-user';

function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredAuth(token, user) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.warn('localStorage not available:', e.message);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  /** Restore session from stored token on load (e.g. after refresh) */
  const checkAuth = useCallback(async () => {
    const storedToken = getStoredToken();
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setAuthChecked(true);
      return;
    }
    try {
      const data = await authApi.me(storedToken);
      setUser(data.user);
      setToken(storedToken);
    } catch {
      // Token invalid or expired; clear storage
      setStoredAuth(null, null);
      setUser(null);
      setToken(null);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password });
    setStoredAuth(data.token, data.user);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (email, password, displayName = '') => {
    const data = await authApi.register({ email, password, displayName });
    setStoredAuth(data.token, data.user);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    setStoredAuth(null, null);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    authChecked,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/**
 * Returns the current token so the API client can attach it to requests.
 */
export function useAuthToken() {
  const { token } = useAuth();
  return token;
}
