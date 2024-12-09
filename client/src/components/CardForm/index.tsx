import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_CARD } from '../../utils/mutations';
import { QUERY_CARDS } from '../../utils/queries';


const CardForm = () => {
    const [formState, setFormState] = useState({
        category: '',
        questionText: '',
        answerText: '',
    });
    const [characterCount, setCharacterCount] = useState(0);

    const [addCard, { error}] = useMutation
    (ADD_CARD, {
        refetchQueries: [
            QUERY_CARDS,
            'getCards'
        ]
    });

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await addCard({
                variables: { input: { ...formState}}
            });

            setCharacterCount(0);
            setFormState({
                category: '',
                questionText: '',
                answerText: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'questionText' && value.length <= 280) {
            setFormState({ ...formState, [name]: value });
            setCharacterCount(value.length);
          } else if (name !== 'thoughtText') {
            setFormState({ ...formState, [name]: value });
          }
        };

    return (
        <div>
            <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
            <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
           <div className="col-12">
          <textarea
            name="thoughtText"
            placeholder="What's the category you want to have?..."
            value={formState.category}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <textarea
            name="thoughtText"
            placeholder="Add your question here please..."
            value={formState.questionText}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="thoughtAuthor"
            placeholder="Add your answer here please..."
            value={formState.answerText}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Card
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
}

export default CardForm;