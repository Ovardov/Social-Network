// Libraries
import { param } from 'express-validator';

// Get post schema
export const getProfileDataValidator = [
  param('username').exists().withMessage('Please add a valid username'),
];
