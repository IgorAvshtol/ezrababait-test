import { UserTodo } from '@/components/UserPage/UserTodo';
import style from '@/styles/TodosList.module.css';
import { ITodo } from '@/interface';

interface IUserTodoList {
  todos: ITodo[];
}

export function UserTodoList({ todos }: IUserTodoList) {
  return (
      <div className={style.container}>
        {todos.map(todo => <UserTodo key={todo._id}
                                     title={todo.title}
                                     author={todo.author}
                                     isDone={todo.isDone}
                                     _id={todo._id}
                                     editMode={todo.editMode}
                                     comments={todo.comments}
            />
        )}
      </div>
  );
}
