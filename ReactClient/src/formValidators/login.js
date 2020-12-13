import { object, string } from 'yup'
import { passwordRegex } from '../utils/regex.js'

export const loginValidationSchema = object({
  email: string().email().required(),
  password: string()
    .required()
    .matches(
      passwordRegex,
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    ),
})
