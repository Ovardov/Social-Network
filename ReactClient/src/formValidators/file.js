import * as Yup from 'yup'

const allowedImageMimeType = ['image/jpeg', 'image/png', 'image/svg']
// Maximum image size is 3MB
const maximumImageSize = 3145728

export const fileSchemaValidation = () => {
  return Yup.mixed()
    .test('fileSize', 'Maximum image size is 3MB.', (value) => {
      // File is not required
      if (!value) {
        return true
      }

      return value.size <= maximumImageSize
    })
    .test(
      'fileType',
      'Image format must be one of the following "jpg, jpeg, png, svg".',
      (value) => {
        // File is not required
        if (!value) {
          return true
        }

        return allowedImageMimeType.includes(value.type)
      }
    )
    .notRequired()
}
