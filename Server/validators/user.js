// Libraries
import { param, body, oneOf, check } from 'express-validator';
import { checkImage } from './file';

export const getProfileDataValidator = [
  param('username').exists().withMessage('Please add a valid username!'),
];

export const updateUserPictureValidator = [
  check('oldImageUrl').isString().withMessage('Please add the old image url!'),
  check('image').custom((value, { req }) => checkImage(req.file)),
];

export const updateUserInfoValidator = [
  oneOf(
    [
      body('work').isString().withMessage('Please add a valid workplace!'),
      body('home').isString().withMessage('Please add a valid place that you lived!'),
      body('education').isString().withMessage('Please add a valid education!'),
      body('about').isString().withMessage('Please add valid details about you!')
    ],
  ),
];
