// Libraries
import React from 'react'
// Styles
import globalButtonStyles from '../buttons.module.scss'
import styles from './index.module.scss'

const LoginButton = () => {
  return (
    <button
      type="submit"
      className={`${globalButtonStyles.button} ${globalButtonStyles['color-primary']} ${styles['login-button']}`}
    >
      Login
      <span className={styles.icon}></span>
    </button>
  )
}

export default LoginButton
