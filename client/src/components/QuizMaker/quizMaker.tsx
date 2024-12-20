import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARDS_BY_CATEGORY } from '../../utils/queries';

// import Categories from '../../pages/Categories';

import './quiz.css'

import { useParams } from 'react-router-dom';

interface Card {
    _id: string;
    questionText: string;
    answerText: string;
  }


  const QuizMaker: React.FC = () => {
    const { category }  = useParams();

    const { loading, error, data } = useQuery(QUERY_CARDS_BY_CATEGORY, 
      {variables: {category: category}}
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [options, setOptions] = useState<string[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (data?.cardsByCategory?.length) {
          generateOptions();
        }
      }, [data, currentQuestionIndex]);

      const generateOptions = () => {
        const cards = data.cardsByCategory;
        if (cards.length) {
          const correctAnswer = cards[currentQuestionIndex].answerText;
          const otherAnswers = cards
            .filter((card: Card) => card._id !== cards[currentQuestionIndex]._id)
            .map((card: Card) => card.answerText)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          const allOptions = [...otherAnswers, correctAnswer].sort(() => 0.5 - Math.random());
          setOptions(allOptions);
        }
      };
      

      const handleNextQuestion = () => {
        setShowAnswer(false);
        setCurrentQuestionIndex((prev) => (prev + 1) % data.cardsByCategory.length);
      };

    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        const currentCard = data.cardsByCategory[currentQuestionIndex];

        

        return (
            <div>

              <h1>Quiz: {category}</h1>

               {currentCard ? (
                <div className='quizSection'>
                  <h2>Question: {currentCard.questionText}</h2>
                  <div className='questions'>
                    {options.map((option, index) => (
                      <button className="button-29" role="button" key={index} onClick={() => setShowAnswer(true)}>
                        {option}
                      </button> 
                    ))}
                  </div>
                  {showAnswer && (
                    <p>
                      Correct Answer: <strong>{currentCard.answerText}</strong>
                    </p>
                  )}
                  <button className='button' onClick={handleNextQuestion}>Next Question</button>
                </div>
              ) : (
                <p>No questions available in this category..</p>
              )}
            </div>
          );
        };
        
        export default QuizMaker;

