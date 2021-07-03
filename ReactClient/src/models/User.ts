import Image_ from './Image';

export default class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  profilePicture: Image_;
}