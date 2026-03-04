/**
 * Quiz — Multiple-choice quiz for the topic.
 * One question at a time; "Next question" / "Finish quiz" always visible after submit so it never disappears.
 * At the end we show a completion screen with score and call onComplete(score).
 */
import React, { useState } from 'react';

export default function Quiz({ questions, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  /** When true, quiz is finished and we show score — prevents returning null and "disappearing" button */
  const [completed, setCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  // Guard: empty or missing questions — never return null for "in progress" state
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const totalQuestions = safeQuestions.length;

  // Clamp index so we never go out of bounds (avoids question === undefined and null return)
  const safeIndex = Math.min(Math.max(0, index), totalQuestions - 1);
  const question = totalQuestions > 0 ? safeQuestions[safeIndex] : null;
  const isLast = safeIndex === totalQuestions - 1;

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    setShowExplanation(true);
    if (question && selected === question.correctOptionId) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (!question) return;
    if (isLast) {
      // Include current question in score (state may not have updated yet)
      const totalCorrect = correctCount + (selected === question.correctOptionId ? 1 : 0);
      const score = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      setFinalScore(score);
      setCompleted(true);
      onComplete(score);
      return;
    }
    // Move to next question — clamp so we never exceed length
    const nextIndex = Math.min(safeIndex + 1, totalQuestions - 1);
    setIndex(nextIndex);
    setSelected(null);
    setSubmitted(false);
    setShowExplanation(false);
  };

  /** Go back to previous question (only when submitted, so user can review) */
  const handlePrevious = () => {
    if (safeIndex <= 0) return;
    const prevIndex = safeIndex - 1;
    setIndex(prevIndex);
    setSelected(null);
    setSubmitted(false);
    setShowExplanation(false);
  };

  // Completion screen: show score so the UI never "disappears"
  if (completed && finalScore != null) {
    return (
      <div className="quiz quiz-complete">
        <h3 className="quiz-complete-title">Quiz complete!</h3>
        <p className="quiz-complete-score">Your score: <strong>{finalScore}%</strong></p>
        <p className="quiz-complete-message">
          {finalScore >= 80 ? 'Great job! You can move on to the next topic or try the projects.' : 'Review the lesson and try again to reinforce your understanding.'}
        </p>
      </div>
    );
  }

  // No questions at all
  if (totalQuestions === 0) {
    return (
      <div className="quiz">
        <p className="quiz-no-questions">No questions in this quiz. You're done with this topic!</p>
      </div>
    );
  }

  // Edge case: question missing at current index — show completion without setting state in render
  if (!question && totalQuestions > 0) {
    const score = Math.round((correctCount / totalQuestions) * 100);
    return (
      <div className="quiz quiz-complete">
        <h3 className="quiz-complete-title">Quiz complete!</h3>
        <p className="quiz-complete-score">Your score: <strong>{score}%</strong></p>
      </div>
    );
  }

  return (
    <div className="quiz">
      <p className="quiz-progress">Question {safeIndex + 1} of {totalQuestions}</p>
      <h3 className="quiz-question">{question.question}</h3>
      <div className="quiz-options">
        {(question.options || []).map((opt) => (
          <label
            key={opt.id}
            className={`quiz-option ${selected === opt.id ? 'selected' : ''} ${showExplanation && opt.id === question.correctOptionId ? 'correct' : ''} ${showExplanation && selected === opt.id && opt.id !== question.correctOptionId ? 'incorrect' : ''}`}
          >
            <input
              type="radio"
              name="quiz"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              disabled={submitted}
            />
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
      {!submitted ? (
        <button type="button" className="btn-primary" onClick={handleSubmit} disabled={selected == null}>
          Submit
        </button>
      ) : (
        <>
          {question.explanation && (
            <div className="quiz-explanation">
              <strong>Explanation:</strong> {question.explanation}
            </div>
          )}
          <div className="quiz-nav-buttons">
            {safeIndex > 0 && (
              <button type="button" className="btn-secondary" onClick={handlePrevious}>
                Previous question
              </button>
            )}
            <button type="button" className="btn-primary" onClick={handleNext}>
              {isLast ? 'Finish quiz' : 'Next question'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
