"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let TodoService = class TodoService {
    constructor(todoModel, userModel) {
        this.todoModel = todoModel;
        this.userModel = userModel;
    }
    async create(createTodoDto) {
        const createdTodo = new this.todoModel(createTodoDto);
        const createdTodoData = await createdTodo.save();
        const todo = await this.userModel.findByIdAndUpdate(createTodoDto.author, { $push: { todos: createdTodoData } }, { new: true });
        if (todo) {
            return createdTodoData;
        }
        else {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateTodoDto) {
        const changedTodo = await this.todoModel.findByIdAndUpdate(id, { title: updateTodoDto.title, isDone: updateTodoDto.isDone }, { new: true });
        if (changedTodo) {
            await this.userModel.findByIdAndUpdate(updateTodoDto.author, { $set: { 'todos.$[elem].title': updateTodoDto.title, 'todos.$[elem].isDone': updateTodoDto.isDone } }, { arrayFilters: [{ 'elem._id': new mongodb_1.ObjectId(id) }], new: true });
            const countOfIsDone = await this.userModel.aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(updateTodoDto.author)
                    }
                },
                {
                    $project: {
                        num_completed_todos: {
                            $size: {
                                $filter: {
                                    input: {
                                        $map: {
                                            input: '$todos',
                                            as: 'todo',
                                            in: {
                                                $cond: {
                                                    if: { $eq: ['$$todo.isDone', true] },
                                                    then: '$$todo',
                                                    else: null
                                                }
                                            }
                                        }
                                    },
                                    as: 'completed_todo',
                                    cond: { $ne: ['$$completed_todo', null] }
                                }
                            }
                        }
                    }
                }
            ]);
            await this.userModel.findByIdAndUpdate(updateTodoDto.author, { $set: { rank: countOfIsDone[0].num_completed_todos } }, { new: true });
            return changedTodo;
        }
        else {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addComment(id, addCommentDto) {
        const changedTodo = await this.todoModel.findByIdAndUpdate(id, { $push: { comments: addCommentDto } }, { new: true });
        if (changedTodo) {
            await this.userModel.updateOne({ '_id': new mongodb_1.ObjectId(changedTodo.author), 'todos._id': new mongodb_1.ObjectId(changedTodo._id) }, { $push: { 'todos.$.comments': addCommentDto } });
            return changedTodo;
        }
        else {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id, removeTodoData) {
        const removedTodo = await this.todoModel.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
        if (removedTodo) {
            await this.userModel.updateOne({ _id: new mongodb_1.ObjectId(removeTodoData.authorId) }, { $pull: { todos: { _id: new mongodb_1.ObjectId(id) } } });
        }
        else {
            throw new common_1.HttpException('todo not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return removedTodo;
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Todo')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map