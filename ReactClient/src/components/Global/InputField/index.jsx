// Libraries
import React from 'react'
import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'
// Styles
import styles from './input-field.module.scss'

const InputField = ({ type, label, placeholder, field, form }) => {
  return (
    <p className={styles.container}>
      <label htmlFor={field.name}>{label}</label>

      <Field
        className={`${styles.input} ${
          form.errors[field.name] ? styles['error-border'] : ''
        }`}
        type={type}
        name={field.name}
        placeholder={placeholder}
        {...field}
      />

      <ErrorMessage
        render={(message) => (
          <span className={styles.error}>{message || ''}</span>
        )}
        name={field.name}
      />
    </p>
  )
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}

export default InputField
