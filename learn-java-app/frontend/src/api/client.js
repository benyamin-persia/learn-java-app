/**
 * API client for Learn Java backend.
 * Base URL: uses VITE_API_URL in production (e.g. Vercel env) so the frontend
 * can call a backend deployed elsewhere (Railway, Render, etc.). In dev or when
 * not set, uses relative /api (proxied by Vite or same-origin).
 * Attaches JWT from localStorage when present so progress is saved per logged-in user.
 * Throws errors with message and status so UI can show 500 vs 503 (e.g. DB not connected).
 */
const API_BASE = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'learn-java-token';

function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = options.token !== undefined ? options.token : getAuthToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.message || body.error || res.statusText;
    const err = new Error(message);
    err.status = res.status;
    err.code = body.code;
    throw err;
  }
  return res.json();
}

export const curriculumApi = {
  getWeeks: () => request('/curriculum/weeks'),
  getWeek: (slug) => request(`/curriculum/weeks/${slug}`),
  getTopic: (weekSlug, topicSlug) => request(`/curriculum/weeks/${weekSlug}/topics/${topicSlug}`),
  getProjects: () => request('/curriculum/projects'),
  getProject: (slug) => request(`/curriculum/projects/${slug}`),
};

export const progressApi = {
  get: () => request('/progress'),
  updateTopic: (body) => request('/progress/topic', { method: 'POST', body: JSON.stringify(body) }),
  updateProject: (body) => request('/progress/project', { method: 'POST', body: JSON.stringify(body) }),
};

/** Auth: register, login, and me (current user from token) */
export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: (token) => request('/auth/me', { token }),
};
