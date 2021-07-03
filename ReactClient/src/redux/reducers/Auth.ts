import { Reducer as Reducer_ } from 'redux';
import { AuthState as AuthState_, AuthActions as AuthActions_ } from '../actions/Auth';
import { SET_AUTH } from './../actionTypes';
import User_ from '../../models/User';

export const authReducer: Reducer_<AuthState_, AuthActions_> = (
  state = { user: new User_(), isAuthenticated: false, },
  action
) => {
  switch (action.type) {
    case SET_AUTH: {
      return { ...action.authState, };
    }
    default: {
      return state;
    }
  }
};