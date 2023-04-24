import * as mongoose from 'mongoose';
export declare const TodoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
    isDone: boolean;
    editMode: boolean;
    comments: {
        text: {};
        author?: string;
    }[] | {
        author: {};
        text?: string;
    }[];
    author?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    isDone: boolean;
    editMode: boolean;
    comments: {
        text: {};
        author?: string;
    }[] | {
        author: {};
        text?: string;
    }[];
    author?: mongoose.Types.ObjectId;
}>> & Omit<mongoose.FlatRecord<{
    title: string;
    isDone: boolean;
    editMode: boolean;
    comments: {
        text: {};
        author?: string;
    }[] | {
        author: {};
        text?: string;
    }[];
    author?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
