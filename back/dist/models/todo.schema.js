"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
const mongoose = require("mongoose");
exports.TodoSchema = new mongoose.Schema({
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
//# sourceMappingURL=todo.schema.js.map