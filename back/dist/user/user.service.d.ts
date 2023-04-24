/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { AddFriendDTO, RegisterDTO } from './user.dto';
import { LoginDTO } from 'src/auth/login.dto';
import { Payload } from 'src/types/payload';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(RegisterDTO: RegisterDTO): Promise<any>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
    update(id: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    addFriend(data: AddFriendDTO): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByPayload(payload: Payload): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByLogin(UserDTO: LoginDTO): Promise<any>;
    sanitizeUser(user: User): any;
}
