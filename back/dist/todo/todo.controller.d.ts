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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TodoService } from './todo.service';
import { AddCommentDTO, TodoDTO } from './todo.dto';
export declare class TodoController {
    private readonly todosService;
    constructor(todosService: TodoService);
    create(createTodoDto: TodoDTO): Promise<import("mongoose").Document<unknown, {}, import("../types/todo").Todo> & Omit<import("../types/todo").Todo & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateTodoDto: TodoDTO): Promise<import("mongoose").Document<unknown, {}, import("../types/todo").Todo> & Omit<import("../types/todo").Todo & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    addComment(id: string, addCommentDto: AddCommentDTO): Promise<import("mongoose").Document<unknown, {}, import("../types/todo").Todo> & Omit<import("../types/todo").Todo & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    remove(id: string, removeTodoData: {
        authorId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../types/todo").Todo> & Omit<import("../types/todo").Todo & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
