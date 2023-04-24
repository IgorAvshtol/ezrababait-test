import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { addTodo } from '@/store/thunks/todo';
import { TodosList } from '@/components/Todo/TodosList';
import { UsersList } from '@/components/UsersList/UsersList';
import style from '@/styles/Board.module.css';

export function Board() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.auth);
  const { rank } = useAppSelector(state => state.todos);
  const [title, setTitle] = useState<string>('');

  const onTitleFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onAddBtnClickHandler = () => {
    dispatch(addTodo({
      author: currentUser._id,
      title: title,
      isDone: false,
      editMode: false,
      comments: []
    }));
    setTitle('');
  };

  return (
      <div className={style.main}>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.email}</p>
        <p>Your rank is {rank}</p>
        <div className={style.enterDataBlock}>
          <input className={style.input} value={title} onChange={onTitleFieldChangeHandler}/>
          <button onClick={onAddBtnClickHandler}>add</button>
        </div>
        <div className={style.container}>
          <TodosList/>
          <UsersList/>
        </div>
      </div>
  );
}
