import * as Yup from 'yup'
import { fileSchemaValidation } from './file'

// Login schema
export const createPostValidationSchema = Yup.object({
  content: Yup.string().when('file', {
    is: (file) => !file,
    // Content is required if file is empty
    then: Yup.string().required('You have to add content or image'),
  }),
  file: fileSchemaValidation(),
})
