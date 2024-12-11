import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CARD } from '../../utils/mutations';
import { QUERY_CARDS } from '../../utils/queries';
import Card from '../Card/Card';
import './cardlist.css'

interface CardListProps {
  cards: { _id: string; questionText: string; answerText: string }[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const [deleteCard] = useMutation(DELETE_CARD, {
    refetchQueries: [{ query: QUERY_CARDS }], // Refetch cards after deletion
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteCard({ variables: { cardId: id } }); // Match variable name with backend schema
    } catch (error) {
      console.error('Error deleting card:', (error as Error).message);
    }
  };
  

  if (!cards.length) {
    return <h3>No Cards Yet</h3>;
  }

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card._id} // Ensure a unique key is passed
          id={card._id} // Pass the card ID to Card for deletion
          question={card.questionText}
          answer={card.answerText}
          onDelete={handleDelete} // Pass delete handler to Card
        />
      ))}
    </div>
  );
};

export default CardList;
