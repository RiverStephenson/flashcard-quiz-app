import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CARD } from '../../utils/mutations';
import { QUERY_CARDS } from '../../utils/queries';
import './flashcardform.css'; // Optional styles
import { Link } from 'react-router-dom';

const FlashcardForm: React.FC = () => {
  const [formState, setFormState] = useState({
    category: '',
    questionText: '',
    answerText: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [addCard, { error }] = useMutation(ADD_CARD, {
    refetchQueries: [QUERY_CARDS, 'getCards'],
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
        <button type="submit">Create Flashcard</button>
        {error && <div className="error-message">Error creating flashcard. Try again!</div>}
        {/* </Link> */}
      </form>
    </div>
  );
};

export default FlashcardForm;
