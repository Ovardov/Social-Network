// Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorMessage, Field } from 'formik'
// Images
import visibilityIcon from '../../../../../public/images/visibility.svg'
import visibilityOffIcon from '../../../../../public/images/visibility-off.svg'
// Styles
import styles from '../input-field.module.scss'

const getIcon = (type) => {
  return type === 'password' ? visibilityIcon : visibilityOffIcon
}

const getAlt = (type) => {
  return type === 'password' ? 'Visibility On' : 'Visibility Off'
}

const PasswordField = ({ field, form, label, showForgotPasswordLink }) => {
  const fieldError = form.errors[field.name]

  const [type, setType] = useState('password')

  const onClickImageHandler = () =>
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'))

  return (
    <p className={`${styles.container} ${styles['type-password']}`}>
      <span className={styles['label-container']}>
        <label htmlFor={field.name}>{label}</label>

        {showForgotPasswordLink && (
          <Link
            to="/forgot-password"
            className={styles['forgot-password-link']}
          >
            Forgot password ?
          </Link>
        )}
      </span>

      <span className={styles['input-container']}>
        <Field
          className={`${styles.input} ${
            fieldError ? styles['error-border'] : ''
          }`}
          type={type}
          placeholder="********"
          {...field}
        />

        <img
          onClick={onClickImageHandler}
          className={styles.image}
          src={getIcon(type)}
          alt={getAlt(type)}
        />
      </span>

      {fieldError && <span className={styles.error}>{fieldError}</span>}
    </p>
  )
}

export default PasswordField
