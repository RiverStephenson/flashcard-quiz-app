// import gql from @apollo/client
import { gql } from '@apollo/client';

// Use the gql function to access the thoughts entrypoint and export it
export const QUERY_CARDS = gql`
  query getCards {
    cards {
    _id
        category 
        questionText
        answerText
    }
  }
`;

// QUERY_SINGLE_THOUGHT retrieves a single thought along with its associated comments, based on the provided thoughtId variable.
export const QUERY_SINGLE_CARD = gql`
  query getSingleCard($cardId: ID!) {
    card(cardId: $cardId) {
        questionText
        answerText
    }
  }
`;

// Query to filter the categories on the quiz page
export const QUERY_CARDS_BY_CATEGORY = gql`
  query getCardsByCategory($category: String!) {
    cardsByCategory(category: $category) {
      _id
      category
      questionText
      answerText
    }
  }
`;

export const QUERY_UNIQUE_CATEGORY = gql`
query Query {
  uniqueCategories
}
`;