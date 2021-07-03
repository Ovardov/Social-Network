import { postFormData, put, deleteRequest } from '../utils/fetch';

export const createPost = async (data: Object) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return postFormData('/post', formData);
};

export const deletePost = async (id: string) => {
  return deleteRequest(`/post/${id}`);
};

export const likePost = async (postId: string) => {
  return put(`/post/like/${postId}`);
};

export const unlikePost = async (postId: string) => {
  return put(`/post/unlike/${postId}`);
};
