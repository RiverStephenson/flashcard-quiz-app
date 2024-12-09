import { Card, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  email: string;
}

interface CardArgs {
  cardId: string;
}

interface AddCardArgs {
  input:{
  category: string;
  questionText: string;
  answerText: string;
  }
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_parent: any, { email }: UserArgs) => {
      return User.findOne({ email });
    },
    cards: async () => {
      return await Card.find().sort({ createdAt: -1 });
    },
    card: async (_parent: any, { cardId }: CardArgs) => {
      return await Card.findOne({ _id: cardId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addCard: async (_parent: any, { input }: AddCardArgs, context: any) => {
      if (context.user) {
        const card = await Card.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { cards: card._id } }
        );

        return card;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeCard: async (_parent: unknown, { cardId }: CardArgs) => {
      return await Card.findOneAndDelete({ _id: cardId });
    },
  },
};

export default resolvers;
