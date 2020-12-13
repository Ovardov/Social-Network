import { get, post } from '../utils/fetch'

export const login = async (data) => {
  return post('/auth/login', data)
}
export const register = async (data) => {
  return post('/auth/register', data)
}
