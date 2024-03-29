// Libraries
import { check, param } from 'express-validator';
// Validators
import { checkImage } from './file';

// Get post schema
export const getOnePostDataValidator = [
  param('id').exists().isMongoId().withMessage('Please select a valid post'),
];

// Create post schema
export const createOrEditPostDataValidator = [
  check('content')
    .if((value, { req }) => !value && !req.file)
    .isString()
    .withMessage('Please enter content or upload image'),
  check('image').custom((value, { req }) => checkImage(req.file)),
];
