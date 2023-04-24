import { useAppDispatch, useAppSelector } from '@/store/store';
import { actions } from '@/store/actions';
import { logout } from '@/store/thunks/auth';
import { deleteCurrentUser } from '@/store/thunks/users';
import style from '@/styles/Header.module.css';

export function Header() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.auth);
  const onSignInBtnClickHandler = () => {
    dispatch(actions.showSignInModal());
  };

  const onSignUpBtnClickHandler = () => {
    dispatch(actions.showSignUpModal());
  };

  const onLogoutBtnClickHandler = () => {
    dispatch(logout());
  };

  const onDeleteUserBtnClickHandler = () => {
    dispatch(deleteCurrentUser(currentUser._id));
  };

  return (
      <div className={style.container}>
        {
            !currentUser.name &&
            <div className={style.buttonsBlock}>
              <button className={style.button} onClick={onSignInBtnClickHandler}>Sign In</button>
              <button className={style.button} onClick={onSignUpBtnClickHandler}>Sign Up</button>
            </div>
        }
        {
            currentUser.name &&
            <div className={style.buttonsBlockForAuth}>
              <button className={style.button} onClick={onLogoutBtnClickHandler}>Logout</button>
              <button className={style.button} onClick={onDeleteUserBtnClickHandler}>Delete user</button>
            </div>
        }
      </div>
  );
}
