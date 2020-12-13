import { object, string, ref } from 'yup'
import { nameRegex, passwordRegex, usernameRegex } from '../utils/regex.js'

// Login schema
export const loginValidationSchema = object({
  email: string().email().required('Email is required'),
  password: string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    ),
})

// Register schema
const firstStepRegisterValidationSchema = object({
  firstName: string()
    .required('First name is required')
    .matches(nameRegex, 'Please enter a valid first name'),
  lastName: string()
    .required('Last name is required')
    .matches(nameRegex, 'Please enter a valid first name'),
  username: string()
    .required('Username is required')
    .matches(
      usernameRegex,
      'Username must have 3-25 characters and can contains only latin alphabets, numbers, and symbols .-_'
    ),
})

const secondStepRegisterValidationSchema = object({
  email: string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    ),
  repeatPassword: string()
    .required('Repeat password is required')
    .oneOf([ref('password')], 'Passwords must match'),
})

export const registerValidationSchema = [
  firstStepRegisterValidationSchema,
  secondStepRegisterValidationSchema,
]
