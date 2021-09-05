import User_ from './User';
export default class Comment {
  id: string;
  content: string;
  author: User_;
  post: string;
  isLikedByMe: boolean;
  likesCount?: number;
}

export class CommentFormData {
  content: string;
  postId: string;
}

export class EditCommentFormData {
  content: string;
}