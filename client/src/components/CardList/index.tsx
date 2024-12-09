import React, { useState, useRef } from 'react'
import './index.css'
// import React, { useEffect, useState, FC } from 'react'

interface Card {
    _id: string;
    category: string;
    questionText: string;
    answerText: string;
}

interface CardListProps {
    cards: Card[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const [flip, setFlip] = useState(false)

  const frontEl = useRef<HTMLDivElement>(null)
  const backEl = useRef<HTMLDivElement>(null)

    if (!cards.length) {
        return <h3> No Cards Yet </h3>
    }
    console.log(cards)

return (
    <div>
      {cards?.map((card) => (
          <div key={card._id} 
          className={`card ${flip ? 'flip' : ''}`}
          onClick={() => setFlip(!flip)}
          >
            <h1>QUESTION</h1>
            <h3  
            className= "question"
            ref= {frontEl}
            >
              {card.questionText} <br />
            </h3>
            <h1>ANSWER</h1>
            <h3 
            className= "answer"
            ref= {backEl}
            >
              {card.answerText}
            </h3>
          </div>
        ))}
    </div>
);
};

export default CardList

