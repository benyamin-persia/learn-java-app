/**
 * MultipleChoiceActivity — Single multiple-choice question. User picks one option; we check against correctAnswer (option id).
 */
import React, { useState } from 'react';

export default function MultipleChoiceActivity({ activity, onResult, checked }) {
  const options = activity.options || [];
  const correctId = activity.correctAnswer;
  const [selectedId, setSelectedId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const isCorrect = correctId != null && selectedId === correctId;

  const check = () => {
    setShowFeedback(true);
    onResult(isCorrect);
  };

  return (
    <div className="activity-block multiple-choice-activity">
      <p className="activity-instruction">{activity.instruction}</p>
      <div className="mc-options">
        {options.map((opt) => (
          <label key={opt.id} className={`mc-option ${selectedId === opt.id ? 'selected' : ''} ${showFeedback && opt.id === correctId ? 'correct' : ''} ${showFeedback && selectedId === opt.id && opt.id !== correctId ? 'incorrect' : ''}`}>
            <input
              type="radio"
              name="mc-activity"
              value={opt.id}
              checked={selectedId === opt.id}
              onChange={() => setSelectedId(opt.id)}
              disabled={showFeedback}
            />
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
      {!checked && (
        <button type="button" className="btn-primary" onClick={check} disabled={selectedId == null}>
          Check answer
        </button>
      )}
      {showFeedback && (
        <div className={`activity-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          {activity.explanation && <p>{activity.explanation}</p>}
        </div>
      )}
    </div>
  );
}
