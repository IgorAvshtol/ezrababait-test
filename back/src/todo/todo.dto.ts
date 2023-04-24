export interface TodoDTO {
  author: string;
  title: string;
  isDone: boolean;
  editMode: boolean;
}

export interface AddCommentDTO {
  author: string;
  text: string;
}
