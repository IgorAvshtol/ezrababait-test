import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserTodoList } from '@/components/UserPage/UserTodoList';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addFriend } from '@/store/thunks/users';
import style from '@/styles/UserPage.module.css';
import { IUserData } from '@/interface';

type UserPageProps = Partial<IUserData>;

export function UserPage({ email, name, todos, _id }: UserPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser } = useAppSelector(state => state.auth);
  const isMyFriend = currentUser.friends?.includes(_id!);
  const onAddFriendButtonClickHandler = (userId: string, newFriendId: string) => {
    dispatch(addFriend({ userId: currentUser._id, newFriendId: newFriendId }));
  };

  useEffect(() => {
    if (!Object.values(currentUser)) router.push('/');
  }, [currentUser]);

  return (
      <div className={style.main}>
        <div className={style.container}>
          <h2>{name}</h2>
          <p>{email}</p>
          {
              !isMyFriend &&
              <button onClick={() => onAddFriendButtonClickHandler(currentUser._id, _id!)}>+friend</button>
          }
          <UserTodoList todos={todos!}/>
        </div>
      </div>
  );
}
