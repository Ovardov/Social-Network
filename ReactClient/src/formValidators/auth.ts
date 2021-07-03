import * as Yup from 'yup';
import { nameRegex, passwordRegex, usernameRegex } from '../utils/regex';

// Login schema
export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    ),
});

// Register schema
const firstStepRegisterValidationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .matches(nameRegex, 'Please enter a valid first name'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(nameRegex, 'Please enter a valid first name'),
  username: Yup.string()
    .required('Username is required')
    .matches(
      usernameRegex,
      'Username must have 3-25 characters and can contains only latin alphabets, numbers, and symbols .-_'
    ),
});

const secondStepRegisterValidationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    ),
  repeatPassword: Yup.string()
    .required('Repeat password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const thirdStepRegisterValidationSchema = Yup.object({
  profilePicture: Yup.mixed()
    .test(
      'fileSize',
      'The file is too large, must be lower than 3MB',
      (image) => image.size < 3145728
    )
    .test('fileType', 'Allowed file types are .jpeg, .jpg, .png', (image) =>
      ['image/jpeg', 'image/png'].includes(image.type)
    ),
});

export const registerValidationSchema = [
  firstStepRegisterValidationSchema,
  secondStepRegisterValidationSchema,
  thirdStepRegisterValidationSchema
];
