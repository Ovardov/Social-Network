// Libraries
import { param, check } from 'express-validator';
import { checkImage } from './file';

export const getProfileDataValidator = [
  param('username').exists().withMessage('Please add a valid username'),
];

export const updateUserPictureValidator = [
  check('oldImageUrl').isString().withMessage('Please add the old image url'),
  check('image').custom((value, { req }) => checkImage(req.file)),
];
