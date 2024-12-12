import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { ADD_CARD } from '../../utils/mutations';
import { QUERY_CARDS, QUERY_UNIQUE_CATEGORY } from '../../utils/queries';
import './flashcardform.css'; // Optional styles
// import { Link } from 'react-router-dom';

interface Card {
  _id: string;
  category: string;
  questionText: string;
  answerText: string;
}

interface CardsData {
  cards: Card[];
}

interface UniqueCategoriesData {
  uniqueCategories: string[];
}

const FlashcardForm: React.FC = () => {
  const [formState, setFormState] = useState({
    category: '',
    questionText: '',
    answerText: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [addCard, { error }] = useMutation(ADD_CARD, {
    update(cache: ApolloCache<any>, { data: { addCard } }) {
      try {
        // Update cards list
        const existingData = cache.readQuery<CardsData>({ 
          query: QUERY_CARDS 
        });
        const existingCards = existingData?.cards || [];
        cache.writeQuery({
          query: QUERY_CARDS,
          data: { 
            cards: [...existingCards, addCard] 
          },
        });

        // Update unique categories
        const existingCategories = cache.readQuery<UniqueCategoriesData>({
          query: QUERY_UNIQUE_CATEGORY
        });
        const uniqueCategories = existingCategories?.uniqueCategories || [];
        if (!uniqueCategories.includes(addCard.category)) {
          cache.writeQuery({
            query: QUERY_UNIQUE_CATEGORY,
            data: {
              uniqueCategories: [...uniqueCategories, addCard.category]
            }
          });
        }
      } catch (e) {
        console.error('Error updating cache:', e);
      }
    }
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await addCard({ variables: { input: { ...formState } } });
      setSuccessMessage('Flashcard added successfully!');
      setFormState({ category: '', questionText: '', answerText: '' });
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (err) {
      console.error('Error creating flashcard:', err);
    }
  };

  return (
    <main className='createFlashcard'>
      <div className="flashcard-form">
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Enter category"
              value={formState.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionText">Question</label>
            <textarea
              id="questionText"
              name="questionText"
              placeholder="Enter question"
              value={formState.questionText}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="answerText">Answer</label>
            <textarea
              id="answerText"
              name="answerText"
              placeholder="Enter answer"
              value={formState.answerText}
              onChange={handleInputChange}
            />
          </div>
          {/* <Link to="/categories"> */}
          <button type="submit" className='button'>Create Flashcard</button>
          {error && <div className="error-message">Error creating flashcard. Try again!</div>}
          {/* </Link> */}
        </form>
      </div>
    </main>
  );
};

export default FlashcardForm;
