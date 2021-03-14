import { postFormData, put, deleteRequest } from '../utils/fetch'

export const createPost = async (data) => {
  const formData = new FormData()

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue)
  })

  return postFormData('/post', formData)
}

export const deletePost = async (id) => {
  return deleteRequest(`/post/${id}`);
}

export const likePost = async (postId) => {
  return put(`/post/like/${postId}`)
}

export const unlikePost = async (postId) => {
  return put(`/post/unlike/${postId}`)
}
