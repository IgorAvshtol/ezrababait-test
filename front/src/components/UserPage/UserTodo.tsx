import { CommentsBlock } from '@/components/Comments/CommentsBlock';
import { ITodo } from '@/interface';
import style from '@/styles/Todo.module.css';

export function UserTodo({ title, isDone, _id, comments }: ITodo) {
  return (
      <div className={style.container}>
        <div className={style.todo}>
          <input checked={isDone} readOnly type='checkbox' id='todoStatus'/>
          <div className={style.title}>
            <p>{title}</p>
          </div>
        </div>
        {comments && <CommentsBlock comments={comments} authorTodoId={_id}/>}
      </div>
  );
}
