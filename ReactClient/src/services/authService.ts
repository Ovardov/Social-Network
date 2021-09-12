import { HttpMethods } from './../utils/enums';
import { get, post, makeRequestWithFormData } from '../utils/fetch';
import User_ from '../models/User';

export const login = async (data: Object) => {
  return post('/auth/login', data) as Promise<User_>;
};

export const register = async (data: Object) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return makeRequestWithFormData('/auth/register', formData, HttpMethods.POST) as Promise<User_>;
};

export const logout = async () => {
  return get('/auth/logout');
};