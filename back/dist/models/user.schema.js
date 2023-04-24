"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rank: { type: Number, default: 0 },
    todos: { type: [], ref: 'Todo' },
    friends: [{ type: String, index: { unique: true } }],
});
exports.UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user.schema.js.map