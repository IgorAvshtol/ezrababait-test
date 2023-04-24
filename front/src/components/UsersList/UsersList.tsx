import Link from 'next/link';

import style from '@/styles/UsersList.module.css';
import { useAppSelector } from '@/store/store';

export function UsersList() {
  const { users } = useAppSelector(state => state.users);
  const { currentUser } = useAppSelector(state => state.auth);

  return (
      <div className={style.container}>
        {
          users.map(user => {
            return (
                <div key={user._id} className={style.linksContainer}>
                  <Link className={style.link} href={currentUser.email === user.email ? '/' : `user/${user._id}`}>
                    {user.email}
                  </Link>
                  <p>{currentUser.email === user.email && 'you'}</p>
                  <p>{currentUser.friends.includes(user._id) && 'friend'}</p>
                </div>
            );
          })
        }
      </div>
  );
}
