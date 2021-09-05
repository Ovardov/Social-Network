import Image_ from './Image';
import User_ from './User';
import Comment_ from './Comment';

export default class Post {
  id: string; 
  createdAt: Date;
  content: string;
  image: Image_;
  author: User_
  likesCount?: number;
  isLikedByMe: boolean;
  commentsCount?: number;
}

export class PostFormData {
  content: string;
  image: File
}