import { gql } from '@apollo/client';


export const ADD_CARD = gql `
 mutation AddCard($input: CardInput!) {
    addCard(input: $input) {
    _id
    category: string;
    questionText: string;
    answerText: string;
    createdAt: Date;
    }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

