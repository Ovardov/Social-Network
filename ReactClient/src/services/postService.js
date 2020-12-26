import { postFormData } from '../utils/fetch'

export const createPost = async (data) => {
  const formData = new FormData()

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue)
  })

  return postFormData('/post', formData)
}
