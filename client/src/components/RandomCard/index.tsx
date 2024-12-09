import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARDS } from "../../utils/queries";
import './index.css'

interface Card {
  _id: string;
  category: string;
  questionText: string;
  answerText: string;
}

const RandomCard: React.FC = () => {
  const { loading, error, data } = useQuery(QUERY_CARDS);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const [flip, setFlip] = useState(false)

  const frontEl = useRef<HTMLDivElement>(null)
  const backEl = useRef<HTMLDivElement>(null)

  // Select a random card when cards are available
  const generateRandomCard = () => {
    if (data?.cards?.length) {
      const randomIndex = Math.floor(Math.random() * data.cards.length);
      setCurrentCard(data.cards[randomIndex]);
    }
  };

  // Generate the first card when data loads
  React.useEffect(() => {
    if (data?.cards?.length && !currentCard) {
      generateRandomCard();
    }
  }, [data]);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
  <main className= "main">
  <div
  className={`randomCard ${flip ? 'flip' : ''}`}
  onClick={() => setFlip(!flip)}
  >
  {currentCard ? (
    <div>
      <div >
      <h1>QUESTION</h1>
      <h3
      className= "question"
      ref= {frontEl}
      >{currentCard.questionText}</h3>
      </div>

      <div>
      <h1>ANSWER</h1>
      <h3
      className= "answer"
      ref= {backEl}
      >{currentCard.answerText}</h3>
      </div>
    </div>
  ) : (
    <p>No cards available</p>
  )}
</div>
<button onClick={generateRandomCard}>Next</button>
</main>
);
};

export default RandomCard;