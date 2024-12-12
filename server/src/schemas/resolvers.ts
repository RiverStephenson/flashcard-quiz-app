import { Card, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUserArgs {
  input: {
    email: string;
    password: string;
  };
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
  input: {
    category: string;
    questionText: string;
    answerText: string;
  };
}

interface CardsByCategoryArgs {
  category: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_parent: unknown, { email }: UserArgs) => {
      return User.findOne({ email });
    },
    cards: async () => {
      return Card.find().sort({ createdAt: -1 });
    },
    card: async (_parent: unknown, { cardId }: CardArgs) => {
      return Card.findOne({ _id: cardId });
    },
    me: async (_parent: unknown, _args: unknown, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select('-password');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    cardsByCategory: async (_parent: any, {category}: CardsByCategoryArgs) => {
      return await Card.find({category})
    },
    uniqueCategories: async () => {
      const categories = await Card.distinct("category");
      return categories;
    }
   
  },
  Mutation: {
    addUser: async (_parent: unknown, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.email, user._id);
      return { token, user };
    },
    login: async (_parent: unknown, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const token = signToken(user.email, user._id);
      return { token, user };
    },
    addCard: async (_parent: unknown, { input }: AddCardArgs, context: any) => {
      if (context.user) {
        const card = await Card.create({ ...input });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { cards: card._id } }
        );

        if (!updatedUser) {
          throw new AuthenticationError('User not found!');
        }

        return card;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeCard: async (_parent: unknown, { cardId }: CardArgs, context: any) => {
      if (context.user) {
        return Card.findOneAndDelete({ _id: cardId });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;
