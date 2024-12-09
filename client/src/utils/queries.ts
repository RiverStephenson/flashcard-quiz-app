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
        _id
        category
        questionText
        answerText
    }
  }
`;