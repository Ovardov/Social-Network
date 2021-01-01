import { postFormData, put } from '../utils/fetch'

export const createPost = async (data) => {
  const formData = new FormData()

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue)
  })

  return postFormData('/post', formData)
}

export const likePost = async (postId) => {
  return put(`/post/like/${postId}`)
}

export const unlikePost = async (postId) => {
  return put(`/post/unlike/${postId}`)
}
