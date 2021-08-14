import { put } from '../utils/fetch';

export const addFriend = async (username: string) => {
  return put(`/user/friend/add/${username}`);
};

export const removeFriend = async (username: string) => {
  return put(`/user/friend/remove/${username}`);
};
