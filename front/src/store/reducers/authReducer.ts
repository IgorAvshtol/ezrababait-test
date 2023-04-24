import { ActionType, ActionsTypes, IAuthState, IUserData } from '@/interface';

const initialState: IAuthState = {
  currentUser: {} as IUserData,
  error: ''
};

export const authReducer = (state = initialState, action: ActionType): IAuthState => {
  switch (action.type) {
    case ActionsTypes.SIGN_UP:
      return {
        ...state,
        currentUser: action.payload
      };
    case ActionsTypes.SIGN_IN:
      return {
        ...state,
        currentUser: action.payload
      };
    case ActionsTypes.LOGOUT:
      return {
        ...state,
        currentUser: {} as IUserData
      };
    case ActionsTypes.AUTH_ERROR:
      return <IAuthState>{
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
