import { Header } from '@/components/Header/Header';
import { Board } from '@/components/Board/Board';
import { Modal } from '@/components/Modal';
import { useAppSelector } from '@/store/store';
import { ModalTypes } from '@/interface';
import style from '@/styles/Home.module.css';

export default function Home() {
  const { signInModalIsShow, signUpModalIsShow } =
      useAppSelector(state => state.modal);
  const { currentUser } = useAppSelector(state => state.auth);
  return (
      <div className={style.main}>
        <Header/>
        {signInModalIsShow && <Modal modalType={ModalTypes.SIGN_IN}/>}
        {signUpModalIsShow && <Modal modalType={ModalTypes.SIGN_UP}/>}
        {
          currentUser.name ? <Board/> : <p>You need to sign in</p>
        }
      </div>
  );
}
