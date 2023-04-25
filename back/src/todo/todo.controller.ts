import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

import { TodoService } from './todo.service';
import { AddCommentDTO, TodoDTO } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todosService: TodoService) {
  }

  @Post()
  create(@Body() createTodoDto: TodoDTO) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: TodoDTO) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Patch('add-comment/:id')
  addComment(@Param('id') id: string, @Body() addCommentDto: AddCommentDTO) {
    return this.todosService.addComment(id, addCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() removeTodoData: { authorId: string }) {
    return this.todosService.remove(id, removeTodoData);
  }
}
