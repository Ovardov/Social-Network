import { Action as Action_ } from 'redux';
import { ADD_FRIEND, ADD_INTEREST, REMOVE_INTEREST } from './../actionTypes';
import { SET_USER, REMOVE_USER, UPDATE_USER, REMOVE_FRIEND } from '../actionTypes';
import User_ from '../../models/User';
import Interest_ from '../../models/Interest';

export type UserState = User_;

export interface ISetUser extends Action_<typeof SET_USER> {
  user: User_
}

export interface IUpdateUser extends Action_<typeof UPDATE_USER> {
  newUserData: User_
}

export interface IAddFriend extends Action_<typeof ADD_FRIEND> {
  newFriend: User_
}

export interface IRemoveFriend extends Action_<typeof REMOVE_FRIEND> {
  removedFriend: User_
}

export interface IAddInterest extends Action_<typeof ADD_INTEREST> {
  newInterest: Interest_;
}

export interface IRemoveInterest extends Action_<typeof REMOVE_INTEREST> {
  removedInterest: Interest_;
}

export type UserActions = ISetUser | Action_<typeof REMOVE_USER> | IUpdateUser | IAddFriend | IRemoveFriend | IAddInterest | IRemoveInterest;

export const setUserAction = (user: User_): ISetUser => {
  return {
    type: SET_USER,
    user,
  };
};

export const removeUserAction = () => {
  return {
    type: REMOVE_USER,
  };
};

export const updateUserAction = (newUserData: User_) => {
  return {
    type: UPDATE_USER,
    newUserData,
  };
};

export const addFriendAction = (newFriend: User_) => {
  return {
    type: ADD_FRIEND,
    newFriend,
  };
};

export const removeFriendAction = (removedFriend: User_) => {
  return {
    type: REMOVE_FRIEND,
    removedFriend,
  };
};


export const addInterestAction = (newInterest: Interest_) => {
  return {
    type: ADD_INTEREST,
    newInterest,
  };
};

export const removeInterestAction = (removedInterest: Interest_) => {
  return {
    type: REMOVE_INTEREST,
    removedInterest,
  };
};