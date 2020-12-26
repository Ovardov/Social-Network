// Libraries
import { check } from 'express-validator';
// Validators
import { checkImage } from './file';

// Create post schema
export const createPostDataValidator = [
  check('content')
    .if((value, { req }) => !value && !req.file)
    .isString()
    .withMessage('Please enter content or upload image'),
  check('image').custom((value, { req }) => checkImage(req.file)),
];
