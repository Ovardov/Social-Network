export const buildValidationUniqueErrors = (mongooseError) => {
  const errors = []

  // Loop to get all field errors
  for (fieldName in mongooseError.keyPattern) {
    const currentError = {
      value: mongooseError.keyValue[fieldName],
      msg: `User with current ${fieldName} is already registered!`,
      param: fieldName,
      location: 'body'
    }

    errors.push(currentError)
  }

  return { errors }
}

export const buildCustomError = (message) => {
  const errors = []

  const error = {
    value: '',
    msg: message,
    param: '',
    location: 'catch'
  }

  errors.push(error)

  return { errors }
}