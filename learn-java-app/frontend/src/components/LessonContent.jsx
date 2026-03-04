/**
 * LessonContent — Renders lesson markdown. Styled for readability and fun (see index.css).
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function LessonContent({ content }) {
  if (!content) return null;
  return (
    <div className="lesson-content lesson-content--readable">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
