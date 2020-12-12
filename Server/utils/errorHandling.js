const buildValidationModelErrors = (mongooseError) => {
  const errors = {};

  // Loop to get all field errors
  for([fieldName, fieldValue] of Object.entries(mongooseError.errors)) {
    errors[fieldName] = fieldValue.message;
  }

  return errors
}

const buildValidationUniqueErrors = (mongooseError) => {
  const errors = {};

   // Loop to get all field errors
   for(fieldName in mongooseError.keyPattern) {
    errors[fieldName] = `User with current ${fieldName} is already registered!`;
  }

  return errors;
}

module.exports = {
  buildValidationModelErrors,
  buildValidationUniqueErrors
}