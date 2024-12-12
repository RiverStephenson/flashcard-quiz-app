import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARDS } from '../../utils/queries';
import Card from '../Card/Card';
import './randomcard.css'

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

  // Generate a random card when data is first loaded
  useEffect(() => {
    if (data?.cards?.length && !currentCard) {
      generateRandomCard();
    }
  }, [data]); // This will run when data changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className='randoCard'>
      <h1>Flashcards</h1>
      {currentCard && (
        <Card
          key={currentCard._id}
          id={currentCard._id}
          question={currentCard.questionText}
          answer={currentCard.answerText}
        />
      )}
      <button onClick={generateRandomCard} className='button'>Next</button>
    </main>
  )
};

export default RandomCard;
