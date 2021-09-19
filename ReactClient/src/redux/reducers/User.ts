import { Reducer as Reducer_ } from 'redux';
import { UserState as UserState_, UserActions as UserActions_ } from '../actions/User';
import { SET_USER, REMOVE_USER, UPDATE_USER, ADD_FRIEND, REMOVE_FRIEND, ADD_INTEREST, REMOVE_INTEREST } from '../actionTypes';
import User_ from '../../models/User';
import Interest_ from '../../models/Interest';

export const userReducer: Reducer_<UserState_, UserActions_> = (
  state = new User_(),
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
    case ADD_INTEREST: {
      return {
        ...state,
        interests: [...state.interests, action.newInterest],
      };
    }
    case REMOVE_INTEREST: {
      const newInterests = state.interests.filter((interest: Interest_) => interest.name !== action.removedInterest.name);
      
      return {
        ...state,
        interests: newInterests,
      };
    }
    default: {
      return state;
    }
  }
};