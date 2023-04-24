import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { AddCommentDTO, TodoDTO } from './todo.dto';
import { User } from '../types/user';
import { Todo } from '../types/todo';

@Injectable()
export class TodoService {
  constructor(
      @InjectModel('Todo') private todoModel: Model<Todo>,
      @InjectModel('User') private userModel: Model<User>,
  ) {
  }

  async create(createTodoDto: TodoDTO) {
    const createdTodo = new this.todoModel(createTodoDto);
    const createdTodoData = await createdTodo.save();
    const todo = await this.userModel.findByIdAndUpdate(
        createTodoDto.author,
        { $push: { todos: createdTodoData } },
        { new: true },
    );
    if (todo) {
      return createdTodoData;
    } else {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateTodoDto: TodoDTO) {
    const changedTodo = await this.todoModel.findByIdAndUpdate(
        id,
        { title: updateTodoDto.title, isDone: updateTodoDto.isDone },
        { new: true },
    );
    if (changedTodo) {

      await this.userModel.findByIdAndUpdate(
          updateTodoDto.author,
          { $set: { 'todos.$[elem].title': updateTodoDto.title, 'todos.$[elem].isDone': updateTodoDto.isDone } },
          { arrayFilters: [{ 'elem._id': new ObjectId(id) }], new: true },
      );

      const countOfIsDone = await this.userModel.aggregate([
        {
          $match: {
            _id: new ObjectId(updateTodoDto.author)
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

      await this.userModel.findByIdAndUpdate(
          updateTodoDto.author,
          { $set: { rank: countOfIsDone[0].num_completed_todos } },
          { new: true },
      );
      return changedTodo;
    } else {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
  }

  async addComment(id: string, addCommentDto: AddCommentDTO) {
    const changedTodo = await this.todoModel.findByIdAndUpdate(
        id,
        { $push: { comments: addCommentDto } },
        { new: true },
    );

    if (changedTodo) {

      await this.userModel.updateOne(
          { '_id': new ObjectId(changedTodo.author), 'todos._id': new ObjectId(changedTodo._id) },
          { $push: { 'todos.$.comments': addCommentDto } }
      );
      return changedTodo;
    } else {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, removeTodoData: { authorId: string }) {
    const removedTodo = await this.todoModel.findOneAndDelete(
        { _id: new ObjectId(id) }
    );

    if (removedTodo) {
      await this.userModel.updateOne(
          { _id: new ObjectId(removeTodoData.authorId) },
          { $pull: { todos: { _id: new ObjectId(id) } } },
      );

    } else {
      throw new HttpException('todo not found', HttpStatus.BAD_REQUEST);
    }
    return removedTodo;
  }
}
