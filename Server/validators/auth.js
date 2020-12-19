// Libraries
import { check } from 'express-validator'
import { models } from 'mongoose'
// Utils
import { nameRegex, usernameRegex, passwordRegex } from '../utils/regex'
// Validators
import { checkImage } from './file'

const isEmailAvailable = (email) => {
  return new Promise((resolve, reject) => {
    models.User.findOne({ email }, (err, user) => {
      if (err) {
        throw err;
      }

      if (!user) {
        resolve();
        return;
      }

      reject();
    })
  })
}

const isUsernameAvailable = (username) => {
  return new Promise((resolve, reject) => {
    models.User.findOne({ username }, (err, user) => {
      if (err) {
        throw err;
      }

      if (!user) {
        resolve();
        return;
      }

      reject();
    })
  })
}

export const registerDataValidators = [
  check('firstName')
    .matches(nameRegex)
    .withMessage('Please enter a valid first name'),
  check('lastName')
    .matches(nameRegex)
    .withMessage('Please enter a valid last name'),
  check('username')
    .matches(usernameRegex)
    .withMessage(
      'Username must have 3-25 characters and can contains only latin alphabets, numbers, and symbols .-_'
    )
    .custom(isUsernameAvailable)
    .withMessage('Username is already taken!'),
  check('email')
    .isEmail()
    .custom(isEmailAvailable)
    .withMessage('Email is already taken!'),
  check('password')
    .matches(passwordRegex)
    .withMessage(
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    ),

  check('profilePicture').custom((value, { req }) => checkImage(req.file)),
]
