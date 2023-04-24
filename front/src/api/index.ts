import axios from 'axios';

import { IAddFriendData, IAddTodoData, IComment, IDeleteTodoData, ITodo } from '@/interface';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  signUp(name: string, email: string, password: string) {
    return instance.post(`auth/register`, { name, email, password });
  },
  signIn(email: string, password: string) {
    return instance.post(`auth/login`, { email, password });
  },
  logout() {
    return instance.post(`auth/logout`);
  }
};
export const todoAPI = {
  addTodo(data: IAddTodoData) {
    return instance.post(`todo`, data);
  },
  changeTodo(data: ITodo) {
    return instance.patch(`todo/${data._id}`, data);
  },
  deleteTodo(data: IDeleteTodoData) {
    return instance.delete(`todo/${data._id}`, { data: { authorId: data.author } });
  },
  addComment(data: IComment, userId: string) {
    return instance.patch(`todo/add-comment/${userId}`, data);
  },
};

export const usersAPI = {
  getUsers() {
    return instance.get(`user/all`);
  },
  addFriend(data: IAddFriendData) {
    return instance.patch(`user/add-friend`, data);
  },
  deleteCurrentUser(id: string) {
    return instance.delete(`user/${id}`);
  },
};
