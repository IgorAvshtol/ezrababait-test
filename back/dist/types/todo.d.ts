import { Document } from 'mongoose';
export interface Todo extends Document {
    author: string;
    title: string;
    isDone: boolean;
    editMode: boolean;
}
