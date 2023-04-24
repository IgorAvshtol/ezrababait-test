export interface IModalsState {
  signInModalIsShow: boolean;
  signUpModalIsShow: boolean;
}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ITodosState {
  todos: ITodo[];
  rank: number;
}

export interface IAuthState {
  currentUser: IUserData;
  error: '';
}

export interface IUsersState {
  users: IUserData[];
}

export interface IUserPageSSRData {
  pageData: IUserData;
}

export interface IUserData {
  _id: string,
  name: string;
  email: string;
  rank: number;
  friends: string[];
  todos: ITodo[];
}

export interface ITodo {
  _id: string;
  author: string;
  title: string;
  isDone: boolean;
  editMode: boolean;
  comments: IComment[];
}

export interface IAddTodoData {
  author: string;
  title: string;
  isDone: boolean;
  editMode: boolean;
  comments: IComment[];
}

export interface IComment {
  text: string;
  author: string;
}

export interface IEditTodoPayload {
  _id: string;
  title: string;
  editMode: boolean;
  isDone: boolean;
}

export interface IDeleteTodoData {
  _id: string;
  author: string;
}

export interface IAddFriendData {
  userId: string;
  newFriendId: string;
}

export enum ActionsTypes {
  SHOW_SIGN_IN_MODAL = 'SHOW_SIGN_IN_MODAL',
  SHOW_SIGN_UP_MODAL = 'SHOW_SIGN_UP_MODAL',
  CLOSE_MODALS = 'CLOSE_MODALS',
  ADD_TODO = 'ADD_TODO',
  GET_TODOS = 'GET_TODOS',
  DELETE_TODO = 'DELETE_TODO',
  SET_EDIT_MODE = 'SET_EDIT_MODE',
  EDIT_TODO = 'EDIT_TODO',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CHANGE_RANK = 'CHANGE_RANK',
  ADD_COMMENT = 'ADD_COMMENT',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  AUTH_ERROR = 'AUTH_ERROR',
  AUTH = 'AUTH',
  LOGOUT = 'LOGOUT',
  GET_ALL_USERS = 'GET_ALL_USERS',
  ADD_FRIEND = 'ADD_FRIEND',
}

export enum ModalTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP'
}

export interface IShowSignInModal {
  type: ActionsTypes.SHOW_SIGN_IN_MODAL,
}

export interface IShowSignUpModal {
  type: ActionsTypes.SHOW_SIGN_UP_MODAL,
}

export interface ICloseModals {
  type: ActionsTypes.CLOSE_MODALS,
}

export interface IAddTodo {
  type: ActionsTypes.ADD_TODO,
  payload: ITodo;
}

export interface IGetTodos {
  type: ActionsTypes.GET_TODOS,
  payload: ITodo[];
}

export interface IDeleteTodo {
  type: ActionsTypes.DELETE_TODO,
  payload: string;
}

export interface ISetEditMode {
  type: ActionsTypes.SET_EDIT_MODE,
  payload: string;
}

export interface IEditTodo {
  type: ActionsTypes.EDIT_TODO,
  payload: IEditTodoPayload;
}

export interface IChangeTodoStatus {
  type: ActionsTypes.CHANGE_STATUS,
  payload: string;
}

export interface IChangeUserRank {
  type: ActionsTypes.CHANGE_RANK,
  payload: number;
}

export interface IAddComment {
  type: ActionsTypes.ADD_COMMENT,
  payload: IComment;
}

export interface ISignUp {
  type: ActionsTypes.SIGN_UP,
  payload: IUserData;
}

export interface ISignIn {
  type: ActionsTypes.SIGN_IN,
  payload: IUserData;
}

export interface ISignUpError {
  type: ActionsTypes.AUTH_ERROR,
  payload: string;
}

export interface IAuth {
  type: ActionsTypes.AUTH,
  payload: IUserData;
}

export interface ILogout {
  type: ActionsTypes.LOGOUT,
}

export interface IGetAllUsers {
  type: ActionsTypes.GET_ALL_USERS,
  payload: IUserData[];
}

export interface IAddFriend {
  type: ActionsTypes.ADD_FRIEND,
  payload: IAddFriendData;
}

export type ActionType =
    IShowSignInModal
    | IShowSignUpModal
    | ICloseModals
    | IAddTodo
    | IGetTodos
    | IDeleteTodo
    | IEditTodo
    | ISetEditMode
    | IChangeTodoStatus
    | IChangeUserRank
    | IAddComment
    | ISignUp
    | ISignIn
    | ISignUpError
    | IAuth
    | ILogout
    | IGetAllUsers
    | IAddFriend
