import { ActionType, IModalsState, ActionsTypes } from '@/interface';

const initialState: IModalsState = {
  signUpModalIsShow: false,
  signInModalIsShow: false
};

export const modalsReducer = (state = initialState, action: ActionType): IModalsState => {
  switch (action.type) {
    case ActionsTypes.SHOW_SIGN_IN_MODAL:
      return {
        ...state,
        signInModalIsShow: true,
        signUpModalIsShow: false
      };
    case ActionsTypes.SHOW_SIGN_UP_MODAL:
      return {
        ...state,
        signInModalIsShow: false,
        signUpModalIsShow: true
      };
    case ActionsTypes.CLOSE_MODALS:
      return {
        ...state,
        signInModalIsShow: false,
        signUpModalIsShow: false
      };
    default:
      return state;
  }
};
