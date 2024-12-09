import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARDS } from "../../utils/queries";

interface Card {
  _id: string;
  category: string;
  questionText: string;
  answerText: string;
}

const RandomCard: React.FC = () => {
  const { loading, error, data } = useQuery(QUERY_CARDS);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

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
  <div>
  {currentCard ? (
    <div>
      <h1>QUESTION</h1>
      <h3>{currentCard.questionText}</h3>
      <h1>ANSWER</h1>
      <h3>{currentCard.answerText}</h3>
    </div>
  ) : (
    <p>No cards available</p>
  )}
  <button onClick={generateRandomCard}>Next</button>
</div>
);
};

export default RandomCard;