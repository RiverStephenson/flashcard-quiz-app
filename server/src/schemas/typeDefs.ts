const typeDefs = `
  type User {
    _id: ID
    email: String
    password: String
    cards: [Card]!
  }

  type Card {
  _id: ID
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
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Quiz {
    question: String!
    correctAnswer: String!
    options: [String!]!
  }

  type Query {
    users: [User]
    user(email: String!): User
    cards: [Card]!
    card(cardId: ID!): Card
    me: User
    cardsByCategory(category: String!): [Card]
    getQuiz(category: String!): Quiz
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addCard(input: CardInput!): Card
    removeCard(CardId: ID!): Card
  }
`;

export default typeDefs;
