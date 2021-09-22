import { Action as Action_ } from 'redux';
import Post_ from '../../models/Post';
import { ADD_POST, SET_POSTS, UPDATE_POST, REMOVE_POST, REMOVE_POST_COMMENT } from './../actionTypes';

export type PostsState = Post_[];

export interface ISetPosts extends Action_<typeof SET_POSTS> {
  posts: Post_[]
}

export interface IAddPost extends Action_<typeof ADD_POST> {
  post: Post_
}

export interface IUpdatePost extends Action_<typeof UPDATE_POST> {
  post: Post_
}

export interface IDeletePost extends Action_<typeof REMOVE_POST> {
  postId: string
}

export interface IDeletePostComment extends Action_<typeof REMOVE_POST_COMMENT> {
  postId: string
}

export type PostsActions = ISetPosts | IAddPost | IUpdatePost | IDeletePost | IDeletePostComment;

export const addPostAction = (post: Post_): IAddPost => {
  return {
    type: ADD_POST,
    post,
  };
};

export const setPostsAction = (posts: Post_[]) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

export const updatePostAction = (post: Post_): IUpdatePost => {
  return {
    type: UPDATE_POST,
    post,
  };
};

export const removePostAction = (postId: string): IDeletePost => {
  return {
    type: REMOVE_POST,
    postId,
  };
};

export const removePostCommentAction = (postId: string): IDeletePostComment => {
  return {
    type: REMOVE_POST_COMMENT,
    postId,
  };
};