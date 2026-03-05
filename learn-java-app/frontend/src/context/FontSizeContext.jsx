/**
 * FontSizeContext — User-adjustable font size for the whole app (especially helpful on mobile).
 * Persists the choice in localStorage so it survives refresh. Applies a class on <html> so all
 * rem-based font sizes scale together. Used by the header "Text size" control.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FontSizeContext = createContext(null);

/** localStorage key for the user's font size preference */
const FONT_SIZE_STORAGE_KEY = 'learn-java-font-size';

/** Allowed values; class on <html> will be font-size-{key} (e.g. font-size-large) */
export const FONT_SIZE_OPTIONS = [
  { key: 'small',   label: 'Small',   ariaLabel: 'Smaller text' },
  { key: 'medium',  label: 'Medium',  ariaLabel: 'Medium text (default)' },
  { key: 'large',  label: 'Large',   ariaLabel: 'Larger text' },
  { key: 'xlarge', label: 'X-Large', ariaLabel: 'Largest text' },
];

const DEFAULT_FONT_SIZE = 'medium';

function getStoredFontSize() {
  try {
    const stored = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    if (FONT_SIZE_OPTIONS.some((o) => o.key === stored)) return stored;
    return DEFAULT_FONT_SIZE;
  } catch {
    return DEFAULT_FONT_SIZE;
  }
}

function applyFontSizeToDocument(sizeKey) {
  const html = document.documentElement;
  if (!html) return;
  // Remove any existing font-size class so only one is active
  FONT_SIZE_OPTIONS.forEach((o) => html.classList.remove(`font-size-${o.key}`));
  if (sizeKey && sizeKey !== DEFAULT_FONT_SIZE) {
    html.classList.add(`font-size-${sizeKey}`);
  }
}

export function FontSizeProvider({ children }) {
  const [fontSize, setFontSizeState] = useState(DEFAULT_FONT_SIZE);

  /** On mount: restore from localStorage and apply to <html> so first paint uses saved size */
  useEffect(() => {
    const stored = getStoredFontSize();
    setFontSizeState(stored);
    applyFontSizeToDocument(stored);
  }, []);

  /** Set new size, persist to localStorage, and apply to document (so all rem-based text scales) */
  const setFontSize = useCallback((sizeKey) => {
    const valid = FONT_SIZE_OPTIONS.some((o) => o.key === sizeKey);
    const next = valid ? sizeKey : DEFAULT_FONT_SIZE;
    setFontSizeState(next);
    try {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, next);
    } catch (e) {
      console.warn('FontSizeContext: could not save preference:', e.message);
    }
    applyFontSizeToDocument(next);
  }, []);

  const value = { fontSize, setFontSize, options: FONT_SIZE_OPTIONS };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) {
    throw new Error('useFontSize must be used within FontSizeProvider');
  }
  return ctx;
}
