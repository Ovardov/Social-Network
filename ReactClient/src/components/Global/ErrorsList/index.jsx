// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components

// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss'


const renderErrors = (errors) => {
  return errors.map(({ code, message }) => (
    <li key={code} className={styles.error}>
      <span className={styles['error-icon']}></span>
      {message}
    </li>
  ))
}

const ErrorsList = ({ errors }) => {
  return (
    errors.length > 0 && (
      <ul className={styles.container}>{renderErrors(errors)}</ul>
    )
  )
}

ErrorsList.propTypes = {
  errors: PropTypes.array.isRequired,
}

export default ErrorsList
