import User_ from './User';

export default class Interest {
  id: string; 
  name: string;
  users: User_[];
}

export class InterestFormData {
  name: string;
}