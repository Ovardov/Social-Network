import { HttpMethods } from '../utils/enums';
import { makeRequestWithFormData, put, deleteRequest, get } from '../utils/fetch';
import Post_, { PostFormData as PostFormData_ } from './../models/Post';
import Like_ from '../models/Like';
import Comment_ from '../models/Comment';

export const getAllPosts = async () => {
  return get('/posts');
};

export const getPostLikes = async (postId: string) => {
  return get(`/posts/${postId}/likes`) as Promise<Like_[]>;
};

export const getPostComments = async (postId: string) => {
  return get(`/posts/${postId}/comments`) as Promise<Comment_[]>;
};

export const createPost = async (data: PostFormData_) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return makeRequestWithFormData('/posts', formData, HttpMethods.POST);
};

export const updatePost = async (data: PostFormData_, postId: string) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return put(`/posts/${postId}`, data);
};

export const deletePost = async (postId: string) => {
  return deleteRequest(`/posts/${postId}`);
};

export const likePost = async (postId: string) => {
  return put(`/posts/like/${postId}`) as Promise<Post_>;
};

export const dislikePost = async (postId: string) => {
  return put(`/posts/dislike/${postId}`) as Promise<Post_>;
};
