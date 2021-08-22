import Image_ from './Image';
import Post_ from './Post';
import User_ from './User';

export default class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  profilePicture: Image_;
  coverPicture: Image_;
  friends: User_[];
  friendsCount?: number;
  posts: Post_[];
  postsCount?: number;
}
export class UserPictureFormData {
  oldImageUrl: string
  image: File
}