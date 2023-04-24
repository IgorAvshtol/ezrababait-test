import { ActionsTypes, ActionType, IUsersState } from '@/interface';

const initialState: IUsersState = {
  users: []
};

export const usersReducer = (state = initialState, action: ActionType): IUsersState => {
  switch (action.type) {
    case ActionsTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};
