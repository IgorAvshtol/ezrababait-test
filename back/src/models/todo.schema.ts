import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  editMode: { type: Boolean, required: true },
  comments: [
    { author: { type: String } },
    { text: { type: String } },
  ],
});
