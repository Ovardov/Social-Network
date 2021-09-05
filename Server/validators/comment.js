// Libraries
import { param, body } from 'express-validator';

export const updateCommentDataValidator = [
  param('id').exists().isMongoId().withMessage('Please select a valid comment'),
  body('content')
    .isString().withMessage('Please add a valid content!')
    .isLength({ min: 1, max: 50 }).withMessage('Comment should be between 1 and 50 symbols!')
];