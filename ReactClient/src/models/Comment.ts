import Post_ from './Post';
import User_ from './User';
import Like_ from './Like';

export default class Comment {
  content: string;
  author: User_;
  post: Post_;
  likes: Like_[];
}