import Post_ from './Post';
import Comment_ from './Comment';
import User_ from './User';

export default class Like {
  post: Post_;
  comment: Comment_;
  likedBy: User_
}