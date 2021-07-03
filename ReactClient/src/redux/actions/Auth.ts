import { Action as Action_ } from 'redux';

import User_ from './../../models/User';

export const SET_AUTH = 'SET_AUTH';

export type AuthState = {
  isAuthenticated: boolean
  user: User_
}

export interface ISetAuth extends Action_<typeof SET_AUTH> {
  payload: AuthState
}

export type AuthActions = ISetAuth;

export const setAuthAction = (user: User_): ISetAuth => {
  return {
    type: SET_AUTH,
    payload: {
      user,
      isAuthenticated: true
    }
  }
}