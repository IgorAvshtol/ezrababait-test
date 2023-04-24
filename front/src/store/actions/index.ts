import { ActionsTypes, IAddFriendData, IComment, IEditTodoPayload, ITodo, IUserData } from '@/interface';

export const actions = {
  showSignInModal: () => ({
    type: ActionsTypes.SHOW_SIGN_IN_MODAL,
  } as const),
  showSignUpModal: () => ({
    type: ActionsTypes.SHOW_SIGN_UP_MODAL,
  } as const),
  closeModals: () => ({
    type: ActionsTypes.CLOSE_MODALS,
  } as const),
  addTodo: (data: ITodo) => ({
    type: ActionsTypes.ADD_TODO,
    payload: data
  } as const),
  getTodos: (data: ITodo[]) => ({
    type: ActionsTypes.GET_TODOS,
    payload: data
  } as const),
  deleteTodo: (id: string) => ({
    type: ActionsTypes.DELETE_TODO,
    payload: id
  } as const),
  setEditMode: (id: string) => ({
    type: ActionsTypes.SET_EDIT_MODE,
    payload: id
  } as const),
  editTodo: (data: IEditTodoPayload) => ({
    type: ActionsTypes.EDIT_TODO,
    payload: data
  } as const),
  changeUserRank: (rank: number) => ({
    type: ActionsTypes.CHANGE_RANK,
    payload: rank
  } as const),
  addComment: (data: IComment) => ({
    type: ActionsTypes.ADD_COMMENT,
    payload: data
  } as const),
  signUp: (data: IUserData) => ({
    type: ActionsTypes.SIGN_UP,
    payload: data
  } as const),
  signIn: (data: IUserData) => ({
    type: ActionsTypes.SIGN_IN,
    payload: data
  } as const),
  authError: (error: string) => ({
    type: ActionsTypes.AUTH_ERROR,
    payload: error
  } as const),
  logout: () => ({
    type: ActionsTypes.LOGOUT,
  } as const),
  getAllUsers: (users: IUserData[]) => ({
    type: ActionsTypes.GET_ALL_USERS,
    payload: users
  } as const),
  addFriend: (data: IAddFriendData) => ({
    type: ActionsTypes.ADD_FRIEND,
    payload: data
  } as const),
};
