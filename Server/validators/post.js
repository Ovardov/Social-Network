// Libraries
import { check, param } from 'express-validator';
// Validators
import { checkImage } from './file';

// Get post schema
export const getPostDataValidator = [
  param('id').optional().isMongoId().withMessage('Please select a valid post'),
];

// Create post schema
export const createPostDataValidator = [
  check('content')
    .if((value, { req }) => !value && !req.file)
    .isString()
    .withMessage('Please enter content or upload image'),
  check('image').custom((value, { req }) => checkImage(req.file)),
];
