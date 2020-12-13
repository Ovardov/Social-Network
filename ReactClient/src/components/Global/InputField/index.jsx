// Libraries
import React from 'react'
import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'
// Styles
import styles from './input-field.module.scss'

const InputField = ({ type, label, placeholder, field, form }) => {
  const fieldError = form.errors[field.name]

  return (
    <p className={styles.container}>
      <label htmlFor={field.name}>{label}</label>

      <Field
        className={`${styles.input} ${
          fieldError ? styles['error-border'] : ''
        }`}
        type={type}
        name={field.name}
        placeholder={placeholder}
        {...field}
      />

      {fieldError && (
        <span className={styles.error}>{fieldError}</span>
      )}
    </p>
  )
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}

export default InputField
