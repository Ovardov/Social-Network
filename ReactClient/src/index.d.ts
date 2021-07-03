import User_ from './models/User'
export interface Object {
  [key: string]: string
}

// ToDo -> Remove any
declare namespace Express {
  export interface Request {
    user?: any
  }
}

// ToDo -> Remove Object
declare global {
  export interface Window {
    __STATE__: {
      user: User_
    },
    __REDUX_DEVTOOLS_EXTENSION__: () => void
  }
}