/**
 * DragOrderActivity — User drags items into the correct order.
 * correctAnswer is array of option ids in the right order.
 */
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, text, isCorrect }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-item ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}`}
      {...attributes}
      {...listeners}
    >
      <span className="drag-handle">⋮⋮</span>
      {text}
    </div>
  );
}

export default function DragOrderActivity({ activity, onResult, checked }) {
  const correctOrder = Array.isArray(activity.correctAnswer) ? activity.correctAnswer : [];
  const [order, setOrder] = useState(() =>
    (activity.options || []).slice().sort(() => Math.random() - 0.5).map((o) => o.id)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const sensors = useSensor(PointerSensor, { activationConstraint: { distance: 5 } });
  const keySensor = useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates });
  const sensorsList = useSensors(sensors, keySensor);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    setOrder((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const check = () => {
    const correct = correctOrder.length === order.length && correctOrder.every((id, i) => order[i] === id);
    setIsCorrect(correct);
    setShowFeedback(true);
    onResult(correct);
  };

  const optionsMap = (activity.options || []).reduce((acc, o) => { acc[o.id] = o; return acc; }, {});

  return (
    <div className="activity-block drag-order-activity">
      <p className="activity-instruction">{activity.instruction}</p>
      <DndContext sensors={sensorsList} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="sortable-list">
            {order.map((id) => (
              <SortableItem
                key={id}
                id={id}
                text={optionsMap[id]?.text || id}
                isCorrect={checked ? (correctOrder.indexOf(id) === order.indexOf(id) ? true : null) : null}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {!checked && (
        <button type="button" className="btn-primary" onClick={check}>
          Check order
        </button>
      )}
      {showFeedback && (
        <div className={`activity-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '✓ Correct!' : '✗ Not quite. Try again or read the lesson.'}
          {activity.explanation && <p>{activity.explanation}</p>}
        </div>
      )}
    </div>
  );
}
