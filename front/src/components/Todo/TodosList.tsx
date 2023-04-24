import { Todo } from '@/components/Todo/Todo';
import { useAppSelector } from '@/store/store';
import style from '@/styles/TodosList.module.css';

export function TodosList() {
  const { todos } = useAppSelector(state => state.todos);
  return (
      <div className={style.container}>
        {todos.map(todo => <Todo key={todo._id}
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
