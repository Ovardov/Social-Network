import Image_ from './Image';
import Interest_ from './Interest';
import Post_ from './Post';
import User_ from './User';

export class UserInfo {
  about?: string;
  work?: string;
  home?: string;
  education?: string;
}
export default class User extends UserInfo {
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
  interests: Interest_[];
}
export class UserPictureFormData {
  oldImageUrl: string
  image: File
}