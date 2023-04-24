import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { actions } from '@/store/actions';
import { signIn, signUp } from '@/store/thunks/auth';
import { ISignInData, ISignUpData, ModalTypes } from '@/interface';
import style from '@/styles/Modal.module.css';

interface IModal {
  modalType: ModalTypes;
}

export function Modal({ modalType }: IModal) {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData | ISignInData>();

  const onCloseBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(actions.closeModals());
  };

  const onSubmit: SubmitHandler<ISignUpData | ISignInData> = (data) => {
    if (modalType === ModalTypes.SIGN_UP) {
      const { name, email, password } = data as ISignUpData;
      dispatch(signUp({ name, email, password }));
    } else {
      const { email, password } = data as ISignInData;
      dispatch(signIn({ email, password }));
    }
  };

  return (
      <div className={style.main}>
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.closeBtnBlock}>
            <button className={style.closeBtn} onClick={onCloseBtnClickHandler}>X</button>
          </div>
          {
              modalType === ModalTypes.SIGN_UP &&
              <>
                <input className={style.input}
                       required
                       {...register('name', { required: true })}
                       placeholder='Your name'
                />
              </>
          }
          <input className={style.input}
                 required
                 type='email'
                 {...register('email', { required: true })}
                 placeholder='Your email'
          />
          <input className={style.input}
                 {...register('password', { required: true })}
                 placeholder='Your password'
          />
          <button type='submit'>{modalType === ModalTypes.SIGN_UP ? 'Sign Up' : 'Sign In'}</button>
          {error && <p>{error}</p>}
        </form>
      </div>
  );
}
