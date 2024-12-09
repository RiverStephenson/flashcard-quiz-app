import type React from 'react';

interface Card {
    _id: string;
    category: string;
    questionText: string;
    answerText: string;
}

interface CardListProps {
    cards: Card[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
    if (!cards.length) {
        return <h3> No Cards Yet </h3>
    }
    console.log(cards)

return (
    <div>
      {cards?.map((card) => (
          <div key={card._id} className="card mb-3">
            <h4 >
              {card.questionText} <br />
            </h4>
            <div>
              <p>{card.answerText}</p>
            </div>
          </div>
        ))}
    </div>
);
};

export default CardList

