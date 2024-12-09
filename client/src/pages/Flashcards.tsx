import NavBar from "../components/NavBar";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CardList from '../components/CardList/index.tsx';
import CardForm from '../components/CardForm/index.tsx';

import { QUERY_SINGLE_CARD } from "../utils/queries";

const Flashcards = () => {

const { cardId } = useParams();

const { loading, data } = useQuery(QUERY_SINGLE_CARD, {
    variables: { cardId: cardId},
});

const card = data?.card || {};

if (card) {
    return <div>Loading...</div>
}
{/* <div>
<h3 >
  {thought.thoughtAuthor} <br />
</h3>
<div>
    {thought.thoughtText}
  </blockquote>
</div>

<div className="my-5">
  <CommentList comments={thought.comments} />
</div>
<div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
  <CommentForm thoughtId={thought._id} />
</div>
</div> */}
};

export default Flashcards;