import * as Yup from 'yup';
import { fileSchemaValidation } from './file';

// Login schema
export const postValidationSchema = Yup.object({
  content: Yup.string().when('image', {
    is: (image: File) => !image,
    // Content is required if file is empty
    then: Yup.string().required('You have to add content or image'),
  }),
  image: fileSchemaValidation(),
});
