import { gql } from '@apollo/client';


export const ADD_CARD = gql`
  mutation AddCard($input: CardInput!) {
    addCard(input: $input) {
      _id
      category
      questionText
      answerText
    }
  }
`
export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
      _id
    }
  }
`;


export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token 
  }
}
`;

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      user {
        _id
        email
      }
      token
    }
  }
`;


