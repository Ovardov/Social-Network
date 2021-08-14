import { Action as Action_ } from 'redux';
import { REMOVE_AUTH, SET_AUTH } from '../actionTypes';

import User_ from './../../models/User';

export type AuthState = {
  isAuthenticated: boolean
  user?: User_
}

export interface ISetAuth extends Action_<typeof SET_AUTH> {
  authState: AuthState
}

export interface IRemoveAuth extends Action_<typeof REMOVE_AUTH> {
  authState: AuthState
}

export type AuthActions = ISetAuth | IRemoveAuth;

export const setAuthAction = (user: User_): ISetAuth => {
  return {
    type: SET_AUTH,
    authState: {
      user,
      isAuthenticated: true,
    },
  };
};

export const removeAuthAction = () => {
  return {
    type: REMOVE_AUTH,
    authState: {
      isAuthenticated: false,
    },
  };
};