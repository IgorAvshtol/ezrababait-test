import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  rank: { type: Number, default: 0 },
  todos: { type: [], ref: 'Todo' },
  friends: [{ type: String, index: { unique: true } }],
});

UserSchema.pre('save', async function (next: (err?: Error) => void) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
