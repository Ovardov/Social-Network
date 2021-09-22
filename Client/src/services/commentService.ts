import { CommentFormData as CommentFormData_, EditCommentFormData as EditCommentFormData_ } from '../models/Comment';
import Post_ from '../models/Post';
import Comment_ from '../models/Comment';
import { deleteRequest, post, put } from '../utils/fetch';

export const commentPost = async (data: CommentFormData_) => {
  return post(`/comments`, data) as Promise<Post_>;
};

export const updateComment = async (commentId: string, data: EditCommentFormData_) => {
  return put(`/comments/${commentId}`, data) as Promise<Comment_>;
};

export const deleteComment = async (commentId: string) => {
  return deleteRequest(`/comments/${commentId}`) as Promise<Comment_>;
};

export const likeComment = async (commentId: string) => {
  return put(`/comments/${commentId}/likes/add`) as Promise<Comment_>;
};

export const dislikeComment = async (commentId: string) => {
  return put(`/comments/${commentId}/likes/remove`) as Promise<Comment_>;
};
