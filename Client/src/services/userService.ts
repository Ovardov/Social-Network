import { makeRequestWithFormData } from './../utils/fetch';
import { get, put, deleteRequest } from '../utils/fetch';
import { HttpMethods } from '../utils/enums';
import User_, {
  UserInfo as UserInfo_,
  UserPictureFormData as UserPictureFormData_
} from '../models/User';
import Interest_, { InterestFormData as InterestFormData_ } from './../models/Interest';

export const auth = async () => {
  return get(`/auth`) as Promise<User_>;
};

export const addFriend = async (username: string) => {
  return put(`/users/friends/add/${username}`);
};

export const removeFriend = async (username: string) => {
  return put(`/users/friends/remove/${username}`);
};

export const updateUserPicture = async (data: UserPictureFormData_) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return makeRequestWithFormData(`/users/pictures`, formData, HttpMethods.PUT);
};

export const updateUserInfo = async (data: UserInfo_) => {
  return put(`/users/info`, data);
};


export const getProfileData = async (username: string) => {
  return get(`/users/${username}`);
};

export const getUserFriends = async (username: string) => {
  return get(`/users/${username}/friends`) as Promise<User_[]>;
};

export const getSuggestedNewFriends = async () => {
  return get(`/users/suggested-new-friends`);
};

export const searchUsers = async (searchValue: string, criterion: 'fullName' | 'interests') => {
  return get(`/users/search/${searchValue}?criterion=${criterion}`) as Promise<User_[]>;
};

export const addInterest = async (data: InterestFormData_) => {
  return put('/users/interests/add', data) as Promise<{ messsage: string, interest: Interest_ }>;
};

export const removeInterest = async (interestId: string) => {
  return deleteRequest(`/users/interests/remove/${interestId}`) as Promise<{ messsage: string, interest: Interest_ }>;
};