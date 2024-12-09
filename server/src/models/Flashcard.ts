import { Schema, model, Document } from 'mongoose';



interface ICard extends Document {
  category: string;
  questionText: string;
  answerText: string;
}

// Define the schema for the Thought document
const cardSchema = new Schema<ICard>(
  {
    category: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    questionText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    answerText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Card = model<ICard>('Card', cardSchema);

export default Card;
