import { Reducer as Reducer_ } from 'redux';
import { UserState as UserState_, UserActions as UserActions_ } from '../actions/User';
import { SET_USER, REMOVE_USER, UPDATE_USER, ADD_FRIEND, REMOVE_FRIEND } from '../actionTypes';
import User_ from '../../models/User';

export const userReducer: Reducer_<UserState_, UserActions_> = (
  state = null,
  action
) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.user, };
    case REMOVE_USER: {
      return null;
    }
    case UPDATE_USER: {
      return { ...action.newUserData, };
    }
    case ADD_FRIEND: {
      return {
        ...state,
        friends: [...state.friends, action.newFriend],
      };
    }
    case REMOVE_FRIEND: {
      const newFriends = state.friends.filter((friend: User_) => friend.username !== action.removedFriend.username);
      
      return {
        ...state,
        friends: newFriends,
      };
    }
    default: {
      return state;
    }
  }
};