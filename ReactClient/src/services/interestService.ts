// Utils
import { get } from '../utils/fetch';
// Models
import Interest_ from '../models/Interest';

export const getOneInterest = async (name: string) => {
  return get(`/interests/${name}`) as Promise<Interest_>;
};