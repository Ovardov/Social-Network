import { Action as Action_ } from 'redux';
import Post_ from '../../models/Post';
import { ADD_POST, SET_POSTS, UPDATE_POST } from './../actionTypes';


export type PostsState = {
  posts: Post_[];
}

export interface ISetPosts extends Action_<typeof SET_POSTS> {
  postsState: PostsState
}

export interface IAddPost extends Action_<typeof ADD_POST> {
  post: Post_
}

export interface IUpdatePost extends Action_<typeof UPDATE_POST> {
  post: Post_
}

export type PostsActions = ISetPosts | IAddPost | IUpdatePost;

export const addPostAction = (post: Post_): IAddPost => {
  return {
    type: ADD_POST,
    post,
  };
};

export const setPostsAction = (posts: Post_[]) => {
  return {
    type: SET_POSTS,
    postsState: {
      posts,
    },
  };
};

export const updatePostAction = (post: Post_): IUpdatePost => {
  return {
    type: UPDATE_POST,
    post,
  };
};