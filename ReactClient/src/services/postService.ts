import { HttpMethods } from '../utils/enums';
import { makeRequestWithFormData, put, deleteRequest } from '../utils/fetch';
import { PostFormData as PostFormData_ } from './../models/Post';

export const createPost = async (data: PostFormData_) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return makeRequestWithFormData('/post', formData, HttpMethods.POST);
};

export const updatePost = async (data: PostFormData_, postId: string) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return put(`/post/${postId}`, data);
};

export const deletePost = async (postId: string) => {
  return deleteRequest(`/post/${postId}`);
};

export const likePost = async (postId: string) => {
  return put(`/post/like/${postId}`);
};

export const dislikePost = async (postId: string) => {
  return put(`/post/dislike/${postId}`);
};
