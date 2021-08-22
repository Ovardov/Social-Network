import { makeRequestWithFormData } from './../utils/fetch';
import { get, put } from '../utils/fetch';
import { HttpMethods } from '../utils/enums';
import {
  UserInfo as UserInfo_,
  UserPictureFormData as UserPictureFormData_
} from '../models/User';

export const addFriend = async (username: string) => {
  return put(`/user/friend/add/${username}`);
};

export const removeFriend = async (username: string) => {
  return put(`/user/friend/remove/${username}`);
};

export const updateUserPicture = async (data: UserPictureFormData_) => {
  const formData = new FormData();

  Object.entries(data).forEach(([fieldName, fieldValue]) => {
    fieldValue && formData.append(fieldName, fieldValue);
  });

  return makeRequestWithFormData(`/user/picture`, formData, HttpMethods.PUT);
};

export const updateUserInfo = async (data: UserInfo_) => {

  return put(`/user/info`, data);
};


export const getProfileData = async (username: string) => {
  return get(`/user/${username}`);
};

export const getUserFriends = async (username: string) => {
  return get(`/user/${username}/friends`);
};
