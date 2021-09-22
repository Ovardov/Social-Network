import { combineReducers } from 'redux';
import { userReducer } from './User';
import { postsReducer } from './Posts';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
});