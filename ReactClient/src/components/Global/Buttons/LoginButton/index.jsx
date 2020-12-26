// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components
import Loader from '../../Loader'
// Images
import ArrowIcon from '../../../../../public/images/arrow-right.svg'
// Styles
import globalButtonStyles from '../buttons.module.scss'
import styles from './index.module.scss'

const LoginButton = ({ disabled, isLoading }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`${globalButtonStyles.button} ${globalButtonStyles['color-primary']} ${styles['login-button']}`}
    >
      {isLoading && <Loader type="local" color="background" />}

      <span className={isLoading ? globalButtonStyles['hidden-text'] : ''}>
        Login
        <ArrowIcon className={styles.icon} />
      </span>
    </button>
  )
}

LoginButton.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default LoginButton
