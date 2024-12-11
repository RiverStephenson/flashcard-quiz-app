import React, { useState, useRef, useEffect } from 'react';
import './sharedcard.css'; // Consolidated shared styles

interface CardProps {
  id: string; // Added id for deletion
  question: string;
  answer: string;
  onDelete?: (id: string) => void; // Optional delete handler
}

const Card: React.FC<CardProps> = ({ id, question, answer, onDelete }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');
  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  const setMaxHeight = () => {
    const frontHeight = frontEl.current?.getBoundingClientRect().height || 0;
    const backHeight = backEl.current?.getBoundingClientRect().height || 0;
    setHeight(`${Math.max(frontHeight, backHeight, 100)}px`);
  };

  useEffect(() => {
    setMaxHeight();
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, [question, answer]);

  return (
    <div className="card-container">
      <div
        className={`card ${flip ? 'flip' : ''}`}
        style={{ height }}
        onClick={() => setFlip(!flip)}
      >
        <div className="front" ref={frontEl}>
          <div className="question">{question}</div>
        </div>
        <div className="back" ref={backEl}>
          <div className="answer">{answer}</div>
        </div>
      </div>
      {onDelete && (
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent flipping when clicking delete
            onDelete(id);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Card;
