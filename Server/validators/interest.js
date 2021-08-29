// Libraries
import { param } from 'express-validator';

// Get interest schema
export const getOneInterestDataValidator = [
  param('name').exists().isString().withMessage('Please select a valid interest name'),
];