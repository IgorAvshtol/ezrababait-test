import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { AppRootState } from '@/store/store';
import { actions } from '@/store/actions';
import { getUsers } from '@/store/thunks/users';
import { authAPI } from '@/api';
import { ActionType, ISignInData, ISignUpData } from '@/interface';

export const signUp = (data: ISignUpData): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const { name, email, password } = data;
      const user = await authAPI.signUp(name, email, password);
      const userData = {
        _id: user.data.user._id,
        email: user.data.user.email,
        name: user.data.user.name,
        todos: user.data.user.todos,
        rank: user.data.user.rank,
        friends: user.data.user.friends
      };
      dispatch(actions.signUp(userData));
      dispatch(actions.getTodos(user.data.user.todos));
      dispatch(getUsers());
      dispatch(actions.closeModals());
    } catch (error: any) {
      dispatch(actions.authError(error.response.data.message));
    }
  };
};

export const signIn = (data: ISignInData): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const { email, password } = data;
      const user = await authAPI.signIn(email, password);
      const userData = {
        _id: user.data.user._id,
        email: user.data.user.email,
        name: user.data.user.name,
        todos: user.data.user.todos,
        rank: user.data.user.rank,
        friends: user.data.user.friends
      };
      dispatch(actions.signIn(userData));
      dispatch(actions.getTodos(user.data.user.todos));
      dispatch(actions.closeModals());
    } catch (error: any) {
      dispatch(actions.authError(error.response.data.message));
    }
  };
};

export const authMe = (): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await authAPI.me();
      const userData = {
        _id: user.data._id,
        email: user.data.email,
        name: user.data.name,
        todos: user.data.todos,
        rank: user.data.rank,
        friends: user.data.friends
      };
      dispatch(actions.signIn(userData));
      dispatch(actions.changeUserRank(user.data.rank));
      dispatch(actions.getTodos(user.data.todos));
      dispatch(actions.closeModals());
    } catch (error: any) {
      dispatch(actions.authError(error.response.data.message));
    }
  };
};

export const logout = (): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      await authAPI.logout();
      dispatch(actions.logout());
    } catch (error: any) {
      dispatch(actions.authError(error.response.data.message));
    }
  };
};

