import { Reducer as Reducer_ } from 'redux';
import { PostsState as PostsState_, PostsActions as PostsActions_ } from '../actions/Posts';
import { ADD_POST, UPDATE_POST, SET_POSTS, REMOVE_POST, REMOVE_POST_COMMENT } from './../actionTypes';

export const postsReducer: Reducer_<PostsState_, PostsActions_> = (
  state = [],
  action
) => {
  switch (action.type) {
    case SET_POSTS: {
      return [...action.posts];
    }
    case ADD_POST: {
      return [action.post, ...state];
    }
    case UPDATE_POST: {
      const { post: updatedPost, } = action;

      const newPosts = state?.map(post => {
        return post?.id === updatedPost.id
          ? updatedPost
          : post;
      });

      return [...newPosts];
    }
    case REMOVE_POST: {
      const { postId: deletedPostId, } = action;

      const newPosts = state?.filter(post => post.id !== deletedPostId);

      return [...newPosts];
    }
    case REMOVE_POST_COMMENT: {
      const { postId: updatedPostId, } = action;

      const newPosts = state?.map(post => {
        if(post.id === updatedPostId) {
          return {
            ...post,
            commentsCount: post?.commentsCount - 1 ?? 0,
          };
        }

        return post;
      });

      return [...newPosts];
    }
    default: {
      return state;
    }
  }
};