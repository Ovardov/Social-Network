import { post, postFormData } from '../utils/fetch'

export const login = async (data: Object) => {
  return post('/auth/login', data);
};

export const register = async (data: Object) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return postFormData('/auth/register', formData);
};
