import { combineReducers } from 'redux';
import { authReducer } from './Auth';
import { postsReducer } from './Posts';

export default combineReducers({
  authState: authReducer,
  postsState: postsReducer,
});