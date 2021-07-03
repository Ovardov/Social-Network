import { Reducer as Reducer_ } from 'redux';
import { AuthState as AuthState_, AuthActions as AuthActions_, SET_AUTH } from '../actions/Auth';
import User_ from '../../models/User';

export const authReducer: Reducer_<AuthState_, AuthActions_> = (
  state = { user: new User_(), isAuthenticated: false, },
  action
) => {
  switch (action.type) {
    case SET_AUTH: {
      return { ...action.payload, };
    }
    default: {
      return state;
    }
  }
};