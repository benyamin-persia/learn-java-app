/**
 * ActivityList — Renders one or more activities (drag-order, match-pairs, multiple-choice).
 * On "Check" we validate; when all activities are correct, call onComplete.
 */
import React, { useState } from 'react';
import DragOrderActivity from './DragOrderActivity';
import MatchPairsActivity from './MatchPairsActivity';
import MultipleChoiceActivity from './MultipleChoiceActivity';

export default function ActivityList({ activities, onComplete }) {
  const [results, setResults] = useState({}); // activity index -> true if correct
  const [checked, setChecked] = useState({});

  const handleResult = (index, correct) => {
    setResults((prev) => ({ ...prev, [index]: correct }));
    setChecked((prev) => ({ ...prev, [index]: true }));
  };

  const allCorrect = activities.length > 0 && activities.every((_, i) => results[i] === true);
  const allChecked = activities.length > 0 && activities.every((_, i) => checked[i] === true);

  return (
    <div className="activity-list">
      {activities.map((activity, index) => {
        const key = activity._id || index;
        if (activity.type === 'drag-order') {
          return (
            <DragOrderActivity
              key={key}
              activity={activity}
              onResult={(correct) => handleResult(index, correct)}
              checked={checked[index]}
            />
          );
        }
        if (activity.type === 'match-pairs') {
          return (
            <MatchPairsActivity
              key={key}
              activity={activity}
              onResult={(correct) => handleResult(index, correct)}
              checked={checked[index]}
            />
          );
        }
        if (activity.type === 'multiple-choice') {
          return (
            <MultipleChoiceActivity
              key={key}
              activity={activity}
              onResult={(correct) => handleResult(index, correct)}
              checked={checked[index]}
            />
          );
        }
        return null;
      })}
      {allChecked && (
        <div className="activity-list-actions">
          {allCorrect ? (
            <button type="button" className="btn-primary" onClick={onComplete}>
              All correct! Continue to Quiz
            </button>
          ) : (
            <p className="activity-feedback">Fix any wrong answers above, then check again.</p>
          )}
        </div>
      )}
    </div>
  );
}
