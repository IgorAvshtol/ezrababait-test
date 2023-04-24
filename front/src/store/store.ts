import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { modalsReducer } from '@/store/reducers/modalsReducer';
import { todosReducer } from '@/store/reducers/todosReducer';
import { authReducer } from '@/store/reducers/authReducer';
import { usersReducer } from '@/store/reducers/usersReducer';

const rootReducer = combineReducers({
  modal: modalsReducer,
  todos: todosReducer,
  auth: authReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
