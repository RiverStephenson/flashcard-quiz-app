import { Card, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (_parent, { email }) => {
            return User.findOne({ email });
        },
        cards: async () => {
            return Card.find().sort({ createdAt: -1 });
        },
        card: async (_parent, { cardId }) => {
            return Card.findOne({ _id: cardId });
        },
        me: async (_parent, _args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).select('-password');
            }
            throw new AuthenticationError('Could not authenticate user.');
        },
        cardsByCategory: async (_parent, { category }) => {
            return await Card.find({ category });
        }
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.email, user._id);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
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
        addCard: async (_parent, { input }, context) => {
            if (context.user) {
                const card = await Card.create({ ...input });
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { cards: card._id } });
                if (!updatedUser) {
                    throw new AuthenticationError('User not found!');
                }
                return card;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeCard: async (_parent, { cardId }, context) => {
            if (context.user) {
                return Card.findOneAndDelete({ _id: cardId });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};
export default resolvers;
