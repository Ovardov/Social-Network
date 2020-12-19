const allowedImageMimeType = ['image/jpeg', 'image/png', 'image/svg'];
// Maximum image size is 3MB
const maximumImageSize = 3145728;

export const checkImage = (file) => {
  // File is not required
  if (!file) {
    return true;
  }

  const isMimeTypeValid = allowedImageMimeType.includes(file.mimetype);
  const isSizeValid = file.size <= maximumImageSize;

  if (isMimeTypeValid && isSizeValid) {
    return true;
  }

  // Build error message
  const errorMessage = `${
    !isMimeTypeValid
      ? 'Image format must be one of the following "jpg, jpeg, png, svg".'
      : ''
  } ${!isSizeValid ? 'Maximum image size is 3MB.' : ''};
  `

  throw new Error(errorMessage.trim());
}
