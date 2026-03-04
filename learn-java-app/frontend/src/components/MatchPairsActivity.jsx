/**
 * MatchPairsActivity — User matches left items to right items (e.g. concept ↔ definition).
 * options = left column (draggable), matchOptions = right column (droppable slots).
 * correctAnswer = [[leftId, rightId], ...]. We store drops: rightId -> leftId (which left was dropped on each right slot).
 */
import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

function DraggableItem({ id, text }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
  return (
    <div ref={setNodeRef} className={`draggable-item ${isDragging ? 'dragging' : ''}`} {...attributes} {...listeners}>
      {text}
    </div>
  );
}

function DroppableSlot({ id, text, droppedLeftText, isOver }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`droppable-slot ${isOver ? 'over' : ''} ${droppedLeftText ? 'filled' : ''}`}>
      {droppedLeftText || text}
    </div>
  );
}

export default function MatchPairsActivity({ activity, onResult, checked }) {
  const leftItems = activity.options || [];
  const rightItems = activity.matchOptions || [];
  const correctPairs = Array.isArray(activity.correctAnswer) ? activity.correctAnswer : [];
  const rightToLeft = correctPairs.reduce((acc, [l, r]) => { acc[r] = l; return acc; }, {});

  const [drops, setDrops] = useState({}); // rightId -> leftId (which left item was dropped on this right slot)
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const leftId = active.id;
    const rightId = over.id;
    if (leftItems.some((o) => o.id === leftId) && rightItems.some((o) => o.id === rightId)) {
      setDrops((prev) => ({ ...prev, [rightId]: leftId }));
    }
  };

  const check = () => {
    const allFilled = rightItems.every((r) => drops[r.id] != null);
    const correct = allFilled && rightItems.every((r) => drops[r.id] === rightToLeft[r.id]);
    setIsCorrect(correct);
    setShowFeedback(true);
    onResult(correct);
  };

  const reset = () => {
    setDrops({});
    setShowFeedback(false);
    setIsCorrect(null);
    onResult(false);
  };

  const leftText = (id) => leftItems.find((l) => l.id === id)?.text || '';

  return (
    <div className="activity-block match-pairs-activity">
      <p className="activity-instruction">{activity.instruction}</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="match-pairs-grid">
          <div className="match-left">
            {leftItems.map((item) => (
              <DraggableItem key={item.id} id={item.id} text={item.text} />
            ))}
          </div>
          <div className="match-right">
            {rightItems.map((item) => (
              <DroppableSlot
                key={item.id}
                id={item.id}
                text={item.text}
                droppedLeftText={drops[item.id] ? leftText(drops[item.id]) : null}
              />
            ))}
          </div>
        </div>
      </DndContext>
      {!checked && (
        <button
          type="button"
          className="btn-primary"
          onClick={check}
          disabled={Object.keys(drops).length < rightItems.length}
        >
          Check matches
        </button>
      )}
      {checked && !isCorrect && (
        <button type="button" className="btn-secondary" onClick={reset}>
          Try again
        </button>
      )}
      {showFeedback && (
        <div className={`activity-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '✓ All correct!' : '✗ Some matches are wrong. Try again.'}
          {activity.explanation && <p>{activity.explanation}</p>}
        </div>
      )}
    </div>
  );
}
