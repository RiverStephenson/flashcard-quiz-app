import { Link } from 'react-router-dom';

interface Card {
    _id: string;
    category: string;
    questionText: string;
    answerText: string;
}

interface CardListProps {
    cards: Card[]
}

return (
    <div>
        {cards &&
        cards.map((card) => (
            <div key= {card._id}>
                <h4> {card.category}</h4>
            </div>
            
        ))
        
        }
    </div>
)

