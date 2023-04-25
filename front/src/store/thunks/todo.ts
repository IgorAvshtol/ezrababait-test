import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { AppRootState } from '@/store/store';
import { actions } from '@/store/actions';
import { authAPI, todoAPI } from '@/api';
import { ActionType, IAddTodoData, IComment, IDeleteTodoData, ITodo } from '@/interface';

export const addTodo = (data: IAddTodoData): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await todoAPI.addTodo({ ...data, comments: [] });
      const { __v, ...todoData } = response.data;
      dispatch(actions.addTodo(todoData));
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const changeTodo = (data: ITodo): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await todoAPI.changeTodo({ ...data, comments: [] });
      const user = await authAPI.me();
      const { __v, ...todoData } = response.data;
      dispatch(actions.editTodo({ ...todoData }));
      dispatch(actions.changeUserRank(user.data.rank));
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const deleteTodo = (data: IDeleteTodoData): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await todoAPI.deleteTodo(data);
      dispatch(actions.deleteTodo(response.data._id));
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const addComments = (data: IComment, userId: string): ThunkAction<void, AppRootState, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      await todoAPI.addComment(data, userId);
    } catch (error: any) {
      throw new Error(error);
    }
  };
};
