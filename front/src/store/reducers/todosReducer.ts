import { ActionType, ITodosState, ActionsTypes } from '@/interface';

const initialState: ITodosState = {
  todos: [],
  rank: 0
};

export const todosReducer = (state = initialState, action: ActionType): ITodosState => {
  switch (action.type) {
    case ActionsTypes.GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case ActionsTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case ActionsTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    case ActionsTypes.SET_EDIT_MODE:
      return {
        ...state,
        todos: state.todos.map(todo => todo._id === action.payload ?
            { ...todo, editMode: !todo.editMode } : todo)
      };
    case ActionsTypes.EDIT_TODO:
      return <ITodosState>{
        ...state,
        todos: state.todos.map(todo => todo._id === action.payload._id ?
            action.payload : todo)
      };
    case ActionsTypes.CHANGE_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo => todo._id === action.payload ?
            { ...todo, isDone: !todo.isDone } : todo)
      };
    case ActionsTypes.CHANGE_RANK:
      return {
        ...state,
        rank: action.payload
      };
    default:
      return state;
  }
};
