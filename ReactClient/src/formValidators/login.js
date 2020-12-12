import { object, string } from 'yup'

export const loginValidationSchema = object({
  email: string().email().required(),
  password: string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must have minimum eight characters, at least one letter and one number'
    ),
})
