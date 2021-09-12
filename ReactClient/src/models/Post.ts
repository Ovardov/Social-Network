import Image_ from './Image';
import User_ from './User';
import Like from './Like';

export default class Post {
  id: string; 
  createdAt: Date;
  content: string;
  image: Image_;
  author: User_
  likesCount?: number;
  likes: Like[];
  commentsCount?: number;
}

export class PostFormData {
  content: string;
  image: File
}