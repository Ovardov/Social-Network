// Libraries
import { param } from 'express-validator';

// Get interest schema
export const getAllRoomMessagesValidator = [
  param('room').exists().isString().withMessage('Please select a valid conversation!'),
];