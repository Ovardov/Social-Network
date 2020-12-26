// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import styles from './index.module.scss'

const CommonErrorMessage = ({ errorMessage }) => {
  return <span className={styles.error}>{errorMessage}</span>
}

CommonErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
}

export default CommonErrorMessage
