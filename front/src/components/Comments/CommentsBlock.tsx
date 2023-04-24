import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { Comment } from '@/components/Comments/Comment';
import { useAppDispatch } from '@/store/store';
import { addComments } from '@/store/thunks/todo';
import style from '@/styles/Comments.module.css';
import { IComment } from '@/interface';

interface ICommentsBlock {
  authorTodoId: string;
  comments: IComment[];
}

export function CommentsBlock({ comments, authorTodoId }: ICommentsBlock) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [commentText, setCommentText] = useState<string>('');

  const onChangeTextFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.currentTarget.value);
  };

  const onSendButtonClickHandler = () => {
    const newCommentData: IComment = { text: commentText, author: 'igor' };
    dispatch(addComments(newCommentData, authorTodoId));

    setCommentText('');
    router.replace(router.asPath);

  };

  return (
      <div className={style.container}>
        <div className={style.commentsBlock}>
          {comments.map(comment => <Comment key={uuidv4()} text={comment.text} author={comment.author}/>)}
        </div>
        <div className={style.inputDataBlock}>
          <input type='text' value={commentText} onChange={onChangeTextFieldHandler}/>
          <button onClick={onSendButtonClickHandler}>send</button>
        </div>
      </div>
  );
}
