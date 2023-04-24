import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    rank: number;
    friends: string[];
    todos: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    password: string;
    rank: number;
    friends: string[];
    todos: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
}>> & Omit<mongoose.FlatRecord<{
    name: string;
    email: string;
    password: string;
    rank: number;
    friends: string[];
    todos: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
