import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARDS } from '../../utils/queries';
import Card from '../Card/Card';

interface Card {
  _id: string;
  questionText: string;
  answerText: string;
}

const RandomCard: React.FC = () => {
  const { loading, error, data } = useQuery<{ cards: Card[] }>(QUERY_CARDS);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const generateRandomCard = () => {
    if (data?.cards?.length) {
      const randomIndex = Math.floor(Math.random() * data.cards.length);
      setCurrentCard(data.cards[randomIndex]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      {currentCard && (
        <Card
        id={currentCard._id} // Add the id here
        question={currentCard.questionText}
        answer={currentCard.answerText}
      />
      )}
      <button onClick={generateRandomCard}>Next</button>
    </main>
  );
};

export default RandomCard;
