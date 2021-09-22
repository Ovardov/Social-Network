import { get } from "../utils/fetch";
import Conversation_ from "../models/Conversation";
import User_ from "../models/User";

export const getAllRoomMessages = async (room: string) => {
  return get(`/conversations/${room}/messages`) as Promise<Conversation_>;
};

export const getAllUserFromMyChat = async () => {
  return get(`/conversations/users`) as Promise<User_[]>;
};