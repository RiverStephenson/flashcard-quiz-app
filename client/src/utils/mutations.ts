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