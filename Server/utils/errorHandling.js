import { capitalizeFirstLetter } from '../utils/helper';

export const buildValidationUniqueErrors = (mongooseError, model) => {
  const errors = []

  // Loop to get all field errors
  for (const fieldName in mongooseError.keyPattern) {
    const collectionName = capitalizeFirstLetter(model.collection.collectionName);
    // Remove last symbol from collection name, because his name is like 'Users'
    const modelName = collectionName.slice(0, collectionName.length - 1);

    const currentError = {
      value: mongooseError.keyValue[fieldName],
      msg: `${modelName} with current ${fieldName} is already exist!`,
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