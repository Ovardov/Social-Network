import User_ from './models/User';
import Post_ from './models/Post';

export interface Object {
  [key: string]: string
}

declare namespace Express {
  export interface Request {
    user?: User_,
    posts?: Post_[]
  }
}

export type ExternalState = {
  user: User_,
  posts: Post_[]
}

declare global {
  interface Window {
    __STATE__: ExternalState,
    __REDUX_DEVTOOLS_EXTENSION__: () => void
  }
}