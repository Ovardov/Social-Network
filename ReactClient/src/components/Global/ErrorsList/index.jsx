// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components

// Hooks

// Services

// Utils

// Images
import ErrorIcon from '../../../../public/images/error-icon.svg'
// Styles
import styles from './index.module.scss'


const renderErrors = (errors) => {
  return errors.map(({ code, msg }, index) => (
    <li key={msg + index} className={styles.error}>
      <ErrorIcon className={styles['error-icon']}/>
      {msg}
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
