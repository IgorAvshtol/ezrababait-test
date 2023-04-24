import { ReactNode, useEffect } from 'react';

import { authMe } from '@/store/thunks/auth';
import { getUsers } from '@/store/thunks/users';
import { useAppDispatch } from '@/store/store';

interface ILayout {
  children: ReactNode;
}

export function Layout({ children }: ILayout) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authMe());
    dispatch(getUsers());
  }, []);

  return <div>{children}</div>;
}
