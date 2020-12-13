const buildValidationModelErrors = (mongooseError) => {
  const errors = []

  // Loop to get all field errors
  for ([fieldName, fieldValue] of Object.entries(mongooseError.errors)) {
    const currentError = {
      message: fieldValue.message,
      code: fieldName,
    }

    errors.push(currentError)
  }

  return { errors }
}

const buildValidationUniqueErrors = (mongooseError) => {
  const errors = []

  // Loop to get all field errors
  for (fieldName in mongooseError.keyPattern) {
    const currentError = {
      message: `User with current ${fieldName} is already registered!`,
      code: fieldName,
    }

    errors.push(currentError)
  }

  return { errors }
}

const buildCustomError = (code, message) => {
  const errors = []

  const error = {
    code,
    message,
  }

  errors.push(error)

  return { errors }
}

module.exports = {
  buildValidationModelErrors,
  buildValidationUniqueErrors,
  buildCustomError
}
