import { object, string, email, required } from 'yup'

export const loginValidationSchema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
})