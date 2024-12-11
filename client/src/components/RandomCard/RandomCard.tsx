import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARDS_BY_CATEGORY } from '../../utils/queries';
import Card from '../Card/Card';
import './randomcard.css'
import { useParams } from 'react-router-dom';

interface Card {
  _id: string;
  questionText: string;
  answerText: string;
}

const RandomCard: React.FC = () => {
const { category } = useParams();

  const { loading, error, data } = useQuery(QUERY_CARDS_BY_CATEGORY, 
    {variables: {category: category}}
  );
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const generateRandomCard = () => {
    if (data?.cardsByCategory?.length) {
      const randomIndex = Math.floor(Math.random() * data.cardsByCategory.length);
      setCurrentCard(data.cardsByCategory[randomIndex]);
    } else if (!data?.cardsByCategory?.length) {
      console.log('no data')
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className='randoCard'>

      {currentCard && (
        <Card
        key={currentCard._id} // Ensure this is unique for each card
        id={currentCard._id} // Add the id here
        question={currentCard.questionText}
        answer={currentCard.answerText}
      />
      )}
      <button onClick={generateRandomCard} className='button'>Next</button>
    </main>
  )
};

export default RandomCard;
