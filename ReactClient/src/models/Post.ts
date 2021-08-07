import Image_ from './Image';
import User_ from './User';
import Like_ from './Like';
import Comment_ from './Comment';

export default class Post {
  id: string; 
  createdAt: Date;
  content: string;
  image: Image_;
  author: User_
  likes: Like_[]
  comments: Comment_[];
}

export class PostFormData {
  content: string;
  image: File
}