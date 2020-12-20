// Libraries
import React from 'react'
// Images
import ArrowIcon from '../../../../../public/images/arrow-right.svg'
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
      <ArrowIcon className={styles.icon }/>
    </button>
  )
}

export default LoginButton
