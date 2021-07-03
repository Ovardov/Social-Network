import { Image } from './../components/Global/Image/index';

export default class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  profilePicture: Image;
}