import React, { useState, useRef, useEffect } from 'react';
import './sharedcard.css';

interface CardProps {
  id: string;
  question: string;
  answer: string;
  onDelete?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, question, answer, onDelete }) => {
  const [flip, setFlip] = useState(false);
  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  return (
    <div className="card-container">
      <div
        className={`card ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="front" ref={frontEl}>
          <div className="question">
            Question:
            <br />
            {question}
          </div>
        </div>
        <div className="back" ref={backEl}>
          <div className="answer">
            Answer:
            <br />
            {answer}
          </div>
        </div>
      </div>
      {onDelete && (
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
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
