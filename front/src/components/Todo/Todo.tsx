import { ChangeEvent, useState } from 'react';

import { changeTodo, deleteTodo } from '@/store/thunks/todo';
import { useAppDispatch } from '@/store/store';
import { actions } from '@/store/actions';
import { ITodo } from '@/interface';
import style from '@/styles/Todo.module.css';

export function Todo({ title, isDone, _id, editMode, author }: ITodo) {
  const [newTitle, setNewTitle] = useState<string>(title);
  const dispatch = useAppDispatch();
  const onEditButtonClickHandler = (id: string) => {
    const changedTodo = {
      _id: id,
      title: newTitle,
      isDone: isDone,
      editMode: false,
      author: author,
      comments: []
    };
    if (!editMode) {
      dispatch(actions.setEditMode(id));
    } else {
      dispatch(changeTodo(changedTodo));
    }
  };

  const onCheckboxChangeHandler = (id: string) => {
    const changedTodo = {
      _id: id,
      title: newTitle,
      isDone: !isDone,
      editMode: false,
      author: author,
      comments: []
    };
    dispatch(changeTodo(changedTodo));
  };

  const onChangeTitleFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onDeleteButtonClickHandler = (id: string) => {
    const deleteTodoData = { _id: id, author: author };
    dispatch(deleteTodo(deleteTodoData));
  };

  return (
      <div className={style.container}>
        <div className={style.todo}>
          <input checked={isDone} onChange={() => onCheckboxChangeHandler(_id)} type='checkbox' id='todoStatus'/>
          <div className={style.title}>
            {!editMode && <p>{title}</p>}
            {editMode && <input type='text' value={newTitle} onChange={onChangeTitleFieldHandler}/>}
          </div>
          <button onClick={() => onEditButtonClickHandler(_id)}>{editMode ? 'ok' : 'edit'}</button>
          <button onClick={() => onDeleteButtonClickHandler(_id)}>delete</button>
        </div>
      </div>
  );
}
