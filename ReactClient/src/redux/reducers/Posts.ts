import { Reducer as Reducer_ } from 'redux';
import { PostsState as PostsState_, PostsActions as PostsActions_ } from '../actions/Posts';
import { ADD_POST, UPDATE_POST, SET_POSTS, DELETE_POST } from './../actionTypes';

export const postsReducer: Reducer_<PostsState_, PostsActions_> = (
  state = { posts: [], },
  action
) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...action.postsState, };
    }
    case ADD_POST: {
      return { posts: [action.post, ...state.posts ], };
    }
    case UPDATE_POST: {
      const { post: updatedPost, } = action;

      const newPosts = state?.posts?.map(post => {
        return post?._id === updatedPost._id
          ? updatedPost
          : post;
      });

      return { posts: [...newPosts], };
    }
    case DELETE_POST: {
      const { postId: deletedPostId, } = action;

      const newPosts = state.posts?.filter(post => post._id !== deletedPostId);

      return { posts: newPosts, };
    }
    default: {
      return state;
    }
  }
};