import { Reducer as Reducer_ } from 'redux';
import { PostsState as PostsState_, PostsActions as PostsActions_ } from '../actions/Posts';
import { ADD_POST, SET_POSTS } from './../actionTypes';

export const postsReducer: Reducer_<PostsState_, PostsActions_> = (
  state = { posts: [], },
  action
) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...action.postsState, };
    }
    case ADD_POST: {
      return { posts: [...state.posts, action.post], };
    }
    default: {
      return state;
    }
  }
};