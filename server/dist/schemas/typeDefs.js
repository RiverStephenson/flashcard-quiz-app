const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cards: [Card]!
  }

  type Card {
    category: String
    questionText: String
    answerText: String
  }


  input CardInput {
    category: String!
    questionText: String!
    answerText: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    cards: [Card]!
    card(cardId: ID!): Card
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addCard(input: CardInput!): Card
    removeCard(CardId: ID!): Card
  }
`;
export default typeDefs;
