import { get, post } from '../utils/fetch'

export const checkAuth = async () => {
  return get('/auth');
}

export const login = async (data) => {
  return post('/auth/login', data);
}