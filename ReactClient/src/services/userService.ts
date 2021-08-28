import { makeRequestWithFormData } from './../utils/fetch';
import { get, put } from '../utils/fetch';
import { HttpMethods } from '../utils/enums';
import {
  UserInfo as UserInfo_,
  UserPictureFormData as UserPictureFormData_
} from '../models/User';

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
  return get(`/users/${username}/friends`);
};

export const getSuggestedNewFriends = async () => {
  return get(`/users/suggested-new-friends`);
};
