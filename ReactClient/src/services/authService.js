import { get, post, postFormData } from '../utils/fetch'

export const login = async (data) => {
  return post('/auth/login', data)
}
export const register = async (data) => {
  const formData = new FormData()
  
  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue)
  })

  return postFormData('/auth/register', formData)
}
