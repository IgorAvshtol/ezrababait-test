import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { AppRootState } from '@/store/store';
import { actions } from '@/store/actions';
import { usersAPI } from '@/api';
import { ActionType, IAddFriendData } from '@/interface';

export const getUsers = (): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await usersAPI.getUsers();
      dispatch(actions.getAllUsers(response.data));
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const addFriend = (data: IAddFriendData): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await usersAPI.addFriend(data);
      const userData = {
        _id: user.data._id,
        email: user.data.email,
        name: user.data.name,
        todos: user.data.todos,
        rank: user.data.rank,
        friends: user.data.friends
      };
      dispatch(actions.signIn(userData));
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const deleteCurrentUser = (id: string): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      await usersAPI.deleteCurrentUser(id);
      dispatch(actions.logout());
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

