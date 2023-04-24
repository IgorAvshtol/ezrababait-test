import style from '@/styles/Comment.module.css';

interface ICommentProps {
  text: string;
  author: string;
}

export function Comment({ text, author }: ICommentProps) {
  return (
      <div className={style.container}>
        <p className={style.commentText}>{text}</p>
        <p>{author}</p>
      </div>
  );
}
